import React, { useState, useEffect } from 'react'
import { getTweets, deleteTweet, postComment, patchTweet, getTopicTweets } from '../actions/tweetActions';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import { isTrendingTopicInState } from '../selectors';

function TweetFeed(props)  {
    useEffect(() => {
        if (props.trendingQueryParam && isTrendingTopicInState(props.trendingWords, props.trendingQueryParam)) {
            props.getTopicTweets(props.trendingQueryParam);
        } else if (props.tweet.tweets.length === 0 || !props.trendingQueryParam) {
            props.getTweets();
        }
    }, [props.trendingQueryParam, props.trendingWords]);
    const tweets = props.tweet.tweets;
    return (
        <>
            {tweets.map((tweet) => (
                <Tweet key={tweet._id} tweet={tweet} />
            ))}
        </>
    )
    
}

const mapStateToProps = (curState) => ({
    tweet: curState.tweet,
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated,
    userid: curState.tweet.userid,
    trendingWords: curState.tweet.trendingWords,
});

const mapDispatchToProps = {
    getTweets,
    deleteTweet,
    postComment,
    patchTweet,
    getTopicTweets,
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetFeed);
