const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/middleware');
router.post('/',(req,res)=>{
    const posUser = req.body;

    if(!posUser.username||!posUser.email||!posUser.password){
        console.log('problem here');
        return res.json({message: 'Please enter all of the required fields',success:false});
    }

    User.findOne({email: posUser.email})
    .then((user)=>{
        if(user){
            console.log('problem here2');
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
const jwtSecret = "";
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
                /*if(!success){
                    res.status(401).json({msg: "Email or Password Incorrect", success: false}); 
                }
                else if(err){
                    res.status(500).json({msg: "Internal server error. Please try again", success: false});
                }*/
                if(!success){
                    res.json({msg: "Email or Password Incorrect"});
                }
                else{
                    const jwtData = { id: foundUser._id, username: foundUser.username };
                    const jwtToken = jwt.sign(jwtData,jwtSecret,{
                        expiresIn: '1h'
                    });
                    res.cookie('token',jwtToken,{httpOnly:true});
                    res.json({success: true, username: foundUser.username, id: foundUser._id});
                }  
            });
        }
    });
});
router.get('/checkcookie',middleware,(req,res)=>{
    console.log("got to check cookie");
    res.json({username: req.username, id: req.userid});
});

module.exports = router;