const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/middleware');
const { Tweet, Comment} = require('../models/Tweet');
const User = require('../models/User');
const { uploadImage } = require('../aws');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const storage = multer.memoryStorage()
const upload = multer({ storage, fileFilter });

router.get('/', (req,res)=>{
    Tweet.find().sort({date:-1})
    .then((items)=>{
        const userProfileImages = {};
        const tweetsWithProfilePromises = items.map(async (tweet)=>{
            if (tweet.userid in userProfileImages) {
                return {
                    comments: tweet.comments,
                    date: tweet.date,
                    imageURL: tweet.imageURL,
                    likes: tweet.likes,
                    username: tweet.username,
                    message: tweet.message,
                    userid: tweet.userid,
                    _id: tweet._id,
                    tweetprofilepic: userProfileImages[tweet.userid]
                }
            } else {
                try {
                    const foundUser = await User.findOne({_id: tweet.userid});
                    if (!foundUser) {
                        res.json({msg: "No user found corresponding to user id", success: false});
                    } else {
                        userProfileImages[tweet.userid] = foundUser.profilepic || '';
                        return {
                            comments: tweet.comments,
                            date: tweet.date,
                            imageURL: tweet.imageURL,
                            likes: tweet.likes,
                            message: tweet.message,
                            username: tweet.username,
                            userid: tweet.userid,
                            _id: tweet._id,
                            tweetprofilepic: userProfileImages[tweet.userid]
                        };
                    }
                } catch {
                    res.json({msg: "Error getting User from id", success: false});
                }
            }
        });
        Promise.all(tweetsWithProfilePromises).then((tweetsWithProfile)=>{
            res.json(tweetsWithProfile);
        });
    });
});

router.post('/',AuthMiddleware, upload.single('picture'), async (req,res)=>{
    let imageURL = '';
    if (req.file) {
        const s3UploadRet = await uploadImage(req.file, 'picture');
        imageURL = s3UploadRet['url'];
    }
    const newTweet = new Tweet({
        username: req.body.username,
        message: req.body.message,
        date: req.body.date,
        userid: req.userid,
        comments: [],
        imageURL: imageURL
    });
    newTweet.save().then(tweet=>{
        User.findOne({_id: tweet.userid},(err,foundUser)=>{
            if(err){
                console.log(err);
                res.json({msg: "Internal server error. Please try again", success: false});
            }
            else if(!foundUser){
                res.json({msg: "No user found corresponding to user id", success: false});
            }
            else {
                const tweetWithProfilePic = {
                    comments: tweet.comments,
                    date: tweet.date,
                    imageURL: tweet.imageURL,
                    likes: tweet.likes,
                    message: tweet.message,
                    username: tweet.username,
                    userid: tweet.userid,
                    _id: tweet._id,
                    tweetprofilepic: foundUser.profilepic || '' 
                }
                res.json(tweetWithProfilePic);
            }
        });
    });
});

router.patch('/:id',AuthMiddleware, upload.single('picture'), async (req,res)=>{
    const changes = {
        message: req.body.message,
    }
    if (req.file) {
        const s3UploadRet = await uploadImage(req.file, 'picture');
        changes['imageURL'] = s3UploadRet['url'];
    }
    Tweet.findByIdAndUpdate(req.params.id, changes, { new: true }).then((updatedPost)=>res.json(updatedPost))
    .catch(err=>{
        console.log(err);
        res.status(400).json({success: false});
    });
});

router.delete('/:id',AuthMiddleware,(req,res)=>{
    Tweet.findById(req.params.id)
    .then(tweet=>tweet.remove().then(()=>res.json({success:true})))
    .catch(err=>{
        res.status(404).json({success: false});
        console.log(err);
    });
});

router.post('/comment/:id',AuthMiddleware,(req,res)=>{
    const newComment = {
        username: req.body.username,
        message: req.body.message
    };
    
    Tweet.findById(req.params.id) 
    .then(tweet=>{
        tweet.comments = [...tweet.comments, newComment];
        tweet.save().then(newTwit=>res.json(newTwit)).catch((e)=>console.log(e));
        
    }).catch(err=>res.status(404).json({success: false}));
});

module.exports = router;