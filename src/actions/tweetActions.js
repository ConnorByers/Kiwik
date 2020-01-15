import axios from 'axios';
import { GET_TWEETS, POST_TWEET, POST_COMMENT, DELETE_TWEET } from './types';

export const getTweets = () => dispatch => {
    console.log('in getTweets');
    axios.get('/api/tweets')
    .then(res=>dispatch({
        type: GET_TWEETS,
        data: res.data
    }));
};

export const postTweet = (tweet) => dispatch => {
    axios.post('/api/tweets',tweet)
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