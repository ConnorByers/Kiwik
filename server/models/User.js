const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.checkPasswordMatch = (password,hashed,next) => {
    /*bcrypt.compare(password,this.password,(err,success)=>{
        if(err){
            console.log(this.username);
            next(err);
        }
        if(success){
            console.log('here2');
            next(err,success);
        }
    });*/
    bcrypt.compare(password,hashed).then(res=>{
        if(res){
            next(true);
        }
        else{
            next(false);
        }
    }).catch(err=>console.log('here'));
}

module.exports = mongoose.model('User',UserSchema);
