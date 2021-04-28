const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../secrets');

const middlewareAuth = (req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, jwtSecret, (err,decoded) => {
            if(err){
                res.status(401).json({msg: "Invalid Token", success: false});
            }
            else{
                req.userid = decoded.id;
                next();
            }
        });
    }
    else{
        res.status(401).json({msg: "No token",success: false});
    }
}

module.exports = middlewareAuth;