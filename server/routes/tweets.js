const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/middleware');
const { Tweet, Comment} = require('../models/Tweet');
const User = require('../models/User');
const { uploadImage } = require('../aws');
const multer = require('multer');
const pos = require('pos');
const mongoose = require('mongoose');
const { capitalizeFirstLetter } = require('../helper');
// mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const storage = multer.memoryStorage()
const upload = multer({ storage, fileFilter });

router.get('/trending', async (req,res) => {
    Tweet.find().sort({date:-1}).limit(100).then(async (tweets) => {
        const wordMap = {};
        await Promise.all(
            tweets.map(async (tweet) => {
                if (tweet.message) {
                    const words = new pos.Lexer().lex(tweet.message.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase());
                    const tagger = new pos.Tagger();
                    const taggedWords = tagger.tag(words);
                    const sentenceWordsMap = {}
                    taggedWords.forEach((taggedWordPair) => {
                        if (taggedWordPair[1] === 'NN' || taggedWordPair[1] === 'NNPS' || taggedWordPair[1] === 'NNP' || taggedWordPair[1] === 'NNS') {
                            sentenceWordsMap[taggedWordPair[0]] = tweet._id;
                        }
                    });
                    Object.keys(sentenceWordsMap).forEach((key) => {
                        wordMap[key] = [ (wordMap[key] ? wordMap[key][0] : 0) + 1, wordMap[key] ? [...wordMap[key][1], sentenceWordsMap[key]] : [sentenceWordsMap[key]] ];
                    });
                }
            }),
        );
        const trendingWordsResponse = Object.entries(wordMap).sort((firstEl, secondEl) => {
            return secondEl[1][0] - firstEl[1][0];
        }).slice(0,5);
        trendingWordsResponse.forEach((trendingWordArray) => {
            trendingWordArray[0] = capitalizeFirstLetter(trendingWordArray[0]);
        });
        res.json(trendingWordsResponse);
    });
});

router.get('/:set', (req,res)=>{
    Tweet.find().sort({date:-1}).skip(10 * req.params.set).limit(10)
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

router.post('/trending/:set', (req,res) => {
    Tweet.find({
        "_id": {
            "$in": req.body.ids.map((id) => mongoose.Types.ObjectId(id))
        }
    }).sort({date:-1}).skip(req.params.set * 15).limit(15)
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

module.exports = router;