import React, { Component } from 'react'
import { getTweets, deleteTweet, postComment, patchTweet } from '../actions/tweetActions';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class TweetFeed extends Component {
    constructor(props){
        super(props);
        this.state={ message: '' };
        this.onChange = this.onChange.bind(this);
    };

    componentDidMount(){
        this.props.getTweets();
    };

    onDeleteClick(id){
        this.props.deleteTweet(id);
    };

    onUpdateClick(id, input){
        this.props.patchTweet(id, {message: input})
    };

    onChange = (e) => { this.setState({ message: e.target.value }); };

    render() {
        const tweets = this.props.tweet.tweets;
        return (
            <>
                {tweets.map((tweet) => (
                    <Tweet tweet={tweet} />
                ))}
            </>
        )
    }
}

const mapStateToProps = (curState) => ({
    tweet: curState.tweet,
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated,
    userid: curState.tweet.userid
});

const mapDispatchToProps = {
    getTweets,
    deleteTweet,
    postComment,
    patchTweet,
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetFeed);
