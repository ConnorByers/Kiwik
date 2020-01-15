const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    username: {
        type: String,
        default: 'Connor'
    },
    message: String,
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        username: {
            type: String,
            default: 'Connor'
        },
        message: String
    }],
    userid: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
    }
});

module.exports.Tweet = mongoose.model('Tweet',TweetSchema);