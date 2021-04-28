const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/middleware');
const { Tweet, Comment} = require('../models/Tweet');
const { uploadImage } = require('../aws');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    console.log('in file FIlter')
    console.log('*****************************************************************************')
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.log('cb false -------------------------------')
        cb(null, false);
    }
};
const storage = multer.memoryStorage()
const upload = multer({ storage, fileFilter });

router.get('/',(req,res)=>{
    Tweet.find().sort({date:-1})
    .then(items=>{
        res.json(items);
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
    newTweet.save().then(tweet=>res.json(tweet));
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
        //newComment.save();
        console.log('here');
        tweet.comments = [...tweet.comments, newComment];
        tweet.save().then(newTwit=>res.json(newTwit)).catch(()=>console.log('error here'));
        
    }).catch(err=>res.status(404).json({success: false}));
});

module.exports = router;