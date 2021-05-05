import React, { useState, useEffect } from 'react'
import { getTweets, deleteTweet, postComment, patchTweet, getTopicTweets,getNextTweetSet, getNextTrendingTweetSet, setReachedEndOfTweetsValue } from '../actions/tweetActions';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import { isTrendingTopicInState } from '../selectors';

function TweetFeed(props)  {
    const [isBottom, setIsBottom] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        const scrollTop = (document.documentElement
            && document.documentElement.scrollTop)
            || document.body.scrollTop;
        const scrollHeight = (document.documentElement
            && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 50 >= scrollHeight){
            setIsBottom(true);
        }
    }

    useEffect(()=>{
        if (isBottom) {
            setIsBottom(false);
            if (props.trendingQueryParam && isTrendingTopicInState(props.trendingWords, props.trendingQueryParam)) {
                props.getNextTrendingTweetSet(props.trendingQueryParam);
            } else if (!props.trendingQueryParam) {
                props.getNextTweetSet();
            }
        }
    }, [props.trendingQueryParam, props.trendingWords, isBottom]);

    useEffect(() => {
        setIsBottom(false);
        props.setReachedEndOfTweetsValue(false);
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
    getNextTweetSet,
    getNextTrendingTweetSet,
    setReachedEndOfTweetsValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetFeed);
