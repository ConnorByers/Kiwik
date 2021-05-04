import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTrendingWords } from '../actions/tweetActions';

function TrendingWords(props) {
    useEffect(()=>{
        props.getTrendingWords();
    }, []);

    return (
        <div className="SignInBoxWrapper greyModal">
            <h3>Trending Words</h3>
            {props.trendingWords.map((trendingWordPair) => (
                <div className="greyModalDiv">
                    <div className="modalline"></div>
                    <p className="trendingWord">{trendingWordPair[0]}</p>
                    <p className="trendingWordUses">{trendingWordPair[1]} Tweets</p>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (curState) => ({
    trendingWords: curState.tweet.trendingWords,
});

const mapDispatchToProps = {
    getTrendingWords,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingWords);
