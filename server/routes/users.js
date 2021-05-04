const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/middleware');
const {jwtSecret} = require('../secrets');
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

router.post('/',(req,res)=>{
    const posUser = req.body;

    if(!posUser.username||!posUser.email||!posUser.password){
        return res.json({message: 'Please enter all of the required fields',success:false});
    }

    User.findOne({email: posUser.email})
    .then((user)=>{
        if(user){
            return res.json({message: 'User already exists. Use a different email',success:false});
        }
        const newUser = new User({
            username: posUser.username,
            email: posUser.email,
            password: posUser.password
        });
        //adding encryption
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then((user)=>{
                    res.json({
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        },
                        success: true
                    });
                }).catch(err=>console.log(err));
            });
        });
    })
});

router.post('/auth', (req,res)=>{
    const { email, password } = req.body;
    if(!email||!password){
        return res.json({msg: "Please enter all fields"});
    }
    User.findOne({email},(err,foundUser)=>{
        if(err){
            console.log(err);
            res.json({msg: "Internal server error. Please try again", success: false});
        }
        else if(!foundUser){
            res.json({msg: "Email or Password Incorrect", success: false});
        }
        else{
            foundUser.checkPasswordMatch(password,foundUser.password,(success)=>{
                if(!success){
                    res.json({msg: "Email or Password Incorrect"});
                }
                else{
                    const jwtData = { id: foundUser._id };
                    const jwtToken = jwt.sign(jwtData,jwtSecret,{
                        expiresIn: '1h'
                    });
                    res.cookie('token',jwtToken, {
                        httpOnly: true,
                        sameSite: true,
                        secure: false,
                    });
                    res.json({success: true, username: foundUser.username, id: foundUser._id,  profilepic: foundUser.profilepic});
                }  
            });
        }
    });
});

router.get('/checkcookie', middleware, (req,res)=>{
    User.findOne({_id: req.userid},(err,foundUser)=>{
        if(err){
            console.log(err);
            res.json({msg: "Internal server error. Please try again", success: false});
        }
        else if(!foundUser){
            res.json({msg: "No user found corresponding to user id", success: false});
        }
        else{
            res.json({success: true, username: foundUser.username, id: foundUser._id,  profilepic: foundUser.profilepic});
        }
    });
});

router.post('/profilepic', middleware, upload.single('avatar'), async (req,res)=>{
    if(!req.file) {
        res.status(400).json({ message: 'No valid file uploaded', success: false });
    }
    const s3UploadRet = await uploadImage(req.file, 'avatar');
    const changes = {
        profilepic: s3UploadRet['url'],
    }
    User.findByIdAndUpdate(req.body.userId, changes, { new: true }).then((updatedUser)=>res.json(updatedUser))
    .catch(err=>{
        console.log(err);
        res.status(500).json({success: false});
    });
});

router.post('/logout', (req,res)=>{
    res.clearCookie('token');
    res.json({success: true});
});

module.exports = router;
