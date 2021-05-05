import axios from 'axios';
import { GET_TWEETS, POST_TWEET, POST_COMMENT, DELETE_TWEET, PATCH_TWEET, GET_TRENDING_WORDS, CLEAR_TWEETS, ADD_TWEETS, CHANGE_VALUE } from './types';
import { RESTAPI_ENDPOINT } from '../config';
import { getTrendingTopicIds } from '../selectors';
import history from '../history';

export const getTweets = () => dispatch => {
    dispatch(setAreTweetsLoadingValue(true));
    axios.get(`${RESTAPI_ENDPOINT}/api/tweets/0`, { withCredentials: true })
    .then(res=>{
        dispatch({
            type: GET_TWEETS,
            data: res.data
        });
        dispatch(setAreTweetsLoadingValue(false));
    });
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
    .then(res=>{
        dispatch({
            type: POST_TWEET,
            data: res.data
        });
        dispatch(getTrendingWords());
    }).catch(err=>alert("You must login to send a message"));
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
    .then(res=>{
        dispatch({
            type: PATCH_TWEET,
            data: res.data
        });
        dispatch(getTrendingWords());
    }).catch(err=>alert("You must login to update a comment"));
};

export const getTrendingWords = () => dispatch => {
    axios.get(`${RESTAPI_ENDPOINT}/api/tweets/trending`, { withCredentials: true })
    .then(res=>dispatch({
        type: GET_TRENDING_WORDS,
        data: res.data
    }));
};

export const getTopicTweets = (topic) => (dispatch, getState) => {
    dispatch(setAreTweetsLoadingValue(true));
    const ids = getTrendingTopicIds(getState(), topic);
    axios.post(`${RESTAPI_ENDPOINT}/api/tweets/trending/0`, { ids }, { withCredentials: true })
    .then(res=>{
        dispatch({
            type: GET_TWEETS,
            data: res.data,
        });
        dispatch(setAreTweetsLoadingValue(false));
    })
};

export const redirectToTopic = (topic) => dispatch => {
    dispatch(setTrendingWordPage(topic));
    history.push(`/?topic=${topic}`);
}

export const redirectToHome = (topic) => dispatch => {
    dispatch(setTrendingWordPage(''));
    history.push('/');
}

export const getNextTweetSet = () => (dispatch, getState) => {
    if (!getState().tweet.areTweetsLoading && !getState().tweet.reachedEndOfTweets) {
        dispatch(setAreTweetsLoadingValue(true));
        axios.get(`${RESTAPI_ENDPOINT}/api/tweets/${getState().tweet.tweetSetNumber + 1}`)
        .then(res=>{
            dispatch({
                type: ADD_TWEETS,
                data: res.data
            });
            if (res.data.length < 15) {
                dispatch(setReachedEndOfTweetsValue(true));
            }
            dispatch(setAreTweetsLoadingValue(false));
        });
    }
}

export const getNextTrendingTweetSet = (topic) => (dispatch, getState) => {
    if (!getState().tweet.areTweetsLoading && !getState().tweet.reachedEndOfTweets) {
        dispatch(setAreTweetsLoadingValue(true));
        const ids = getTrendingTopicIds(getState(), topic);
        axios.post(`${RESTAPI_ENDPOINT}/api/tweets/trending/${getState().tweet.tweetSetNumber + 1}`, { ids }, { withCredentials: true })
        .then(res=>{
            dispatch({
                type: ADD_TWEETS,
                data: res.data
            });
            if (res.data.length < 15) {
                dispatch(setReachedEndOfTweetsValue(true));
            }
            dispatch(setAreTweetsLoadingValue(false));
        });
    }
}

export const setTrendingWordPage = (value) => {
    return {
        type: CHANGE_VALUE,
        key: 'trendingWordPage',
        value,
    }
};

export const setAreTweetsLoadingValue = (value) => {
    return {
        type: CHANGE_VALUE,
        key: 'areTweetsLoading',
        value,
    }
}

export const setReachedEndOfTweetsValue = (value) => {
    return {
        type: CHANGE_VALUE,
        key: 'reachedEndOfTweets',
        value,
    }
}
