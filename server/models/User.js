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
    },
    profilepic: {
        type: String,
        required: false
    }
});

UserSchema.methods.checkPasswordMatch = (password,hashed,next) => {
    bcrypt.compare(password,hashed).then(res=>{
        if(res){
            next(true);
        }
        else{
            next(false);
        }
    }).catch(err=>console.log('Error in password Match'));
}

module.exports = mongoose.model('User',UserSchema);
