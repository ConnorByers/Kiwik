const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/middleware');
const { Tweet, Comment} = require('../models/Tweet');

router.get('/',(req,res)=>{
    Tweet.find().sort({date:-1})
    .then(items=>{
        res.json(items);
    });
});

router.post('/',AuthMiddleware,(req,res)=>{
    console.log(req.body.imageURL);
    console.log(req.body.username);
    const newTweet = new Tweet({
        username: req.body.username,
        message: req.body.message,
        date: req.body.date,
        userid: req.userid,
        //likes: req.body.likes,
        comments: [],
        imageURL: req.body.imageURL
    });
    newTweet.save().then(tweet=>res.json(tweet));
});

router.delete('/:id',AuthMiddleware,(req,res)=>{
    Tweet.findById(req.params.id)
    .then(tweet=>tweet.remove().then(()=>res.json({success:true})))
    .catch(err=>{
        res.status(404).json({success: false});
        console.log(err);
    });
});
/*
router.get('/comment/:id',(req,res)=>{
    Tweet.findById(req.params.id)
    .then(tweet=>{
        res.json(tweet.comments);
    })
    .catch(err=>res.json({success: false}));
});
*/
router.post('/comment/:id',AuthMiddleware,(req,res)=>{
    /*const newComment = new Comment({
        username: req.body.username,
        message: req.body.message
    });*/
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