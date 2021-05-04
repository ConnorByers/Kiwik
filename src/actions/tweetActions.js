import axios from 'axios';
import { GET_TWEETS, POST_TWEET, POST_COMMENT, DELETE_TWEET, PATCH_TWEET, GET_TRENDING_WORDS } from './types';
import { RESTAPI_ENDPOINT } from '../config';

export const getTweets = () => dispatch => {
    axios.get(`${RESTAPI_ENDPOINT}/api/tweets`, { withCredentials: true })
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
    axios.post(`${RESTAPI_ENDPOINT}/api/tweets`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
    .then(res=>dispatch({
        type: POST_TWEET,
        data: res.data
    })).catch(err=>alert("You must login to send a message"));
};

export const postComment = (id,comment) => dispatch => {
    axios.post(`${RESTAPI_ENDPOINT}/api/tweets/comment/${id}`,comment, { withCredentials: true })
    .then(res=>dispatch({
        type: POST_COMMENT,
        data: res.data
    })).catch(err=>alert("You must login to send a comment"));
};

export const deleteTweet = (id) => dispatch => {
    axios.delete(`${RESTAPI_ENDPOINT}/api/tweets/${id}`, { withCredentials: true })
    .then(res=>dispatch({
        type: DELETE_TWEET,
        data: id
    })).catch(err=>alert("You must login to delete a comment"));
};

export const patchTweet = (id, tweetUpdates) => dispatch => {
    const formData = new FormData();
    if (tweetUpdates.picture) {
        formData.append("picture", tweetUpdates.picture);
    }
    formData.append("message", tweetUpdates.message);
    axios.patch(`${RESTAPI_ENDPOINT}/api/tweets/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
    .then(res=>dispatch({
        type: PATCH_TWEET,
        data: res.data
    })).catch(err=>alert("You must login to update a comment"));
};

export const getTrendingWords = () => dispatch => {
    axios.get(`${RESTAPI_ENDPOINT}/api/tweets/trending`, { withCredentials: true })
    .then(res=>dispatch({
        type: GET_TRENDING_WORDS,
        data: res.data
    }));
};
