import axios from 'axios';
import { GET_TWEETS, POST_TWEET, POST_COMMENT, DELETE_TWEET, PATCH_TWEET } from './types';

export const getTweets = () => dispatch => {
    console.log('in getTweets');
    axios.get('/api/tweets')
    .then(res=>dispatch({
        type: GET_TWEETS,
        data: res.data
    }));
};

export const postTweet = (tweet) => dispatch => {
    const formData = new FormData();
    if (tweet.picture) {
        formData.append("picture", tweet.picture);
    }
    formData.append("userId", tweet.userId);
    formData.append("message", tweet.message);
    formData.append("username", tweet.username);
    axios.post('/api/tweets', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res=>dispatch({
        type: POST_TWEET,
        data: res.data
    })).catch(err=>console.log("You must login to send a message"));
};

export const postComment = (id,comment) => dispatch => {
    axios.post(`/api/tweets/comment/${id}`,comment)
    .then(res=>dispatch({
        type: POST_COMMENT,
        data: res.data
    })).catch(err=>console.log("You must login to send a comment"));
};

export const deleteTweet = (id) => dispatch => {
    axios.delete(`/api/tweets/${id}`)
    .then(res=>dispatch({
        type: DELETE_TWEET,
        data: id
    })).catch(err=>console.log("You must login to delete a comment"));
};

export const patchTweet = (id, tweetUpdates) => dispatch => {
    const formData = new FormData();
    if (tweetUpdates.picture) {
        formData.append("picture", tweetUpdates.picture);
    }
    formData.append("message", tweetUpdates.message);
    axios.patch(`/api/tweets/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res=>dispatch({
        type: PATCH_TWEET,
        data: res.data
    })).catch(err=>console.log("You must login to update a comment"));
};
