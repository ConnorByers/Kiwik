import React, { Component } from 'react'
import { getTweets, deleteTweet, postComment } from '../actions/tweetActions';
import { connect } from 'react-redux';
import { Button, Media } from 'reactstrap';
import PropTypes from 'prop-types';
import CommentPoster from './CommentPoster';
import styled from 'styled-components';
class TweetFeed extends Component {
    componentDidMount(){
        console.log('ii');
        this.props.getTweets();
    }

    onDeleteClick(id){
        console.log('clicked');
        console.log(id);
        this.props.deleteTweet(id);
    }//#56baed
    Wrapper = styled.div`
        font-family: "Segoe UI","Helvetica";
        margin-top: 2em;
        padding-bottom: 2em;
    `;
    Wrapper2 = styled.div`
        width: 75%;
        margin: auto;
        margin-top: 2em;
        background: white;
        border-radius: 25px;
        border: 2px solid lightblue;
        padding: 20px;
    `;
    Wrapper3 = styled.div`
        margin-left: 1em;
        margin-top: 1em;
        margin-right: 1em;
        margin-bottom: 1em;
    `;
    Line = styled.hr`
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
    `;
    render() {
        const imageStyle = {
            maxHeight: 456,
            maxWidth: 456
        }
        const tweets = this.props.tweet.tweets;
        console.log(tweets);
        return (
            <this.Wrapper>
                {tweets.map((tweet)=>(
                    <this.Wrapper2 key={tweet._id}>
                        <this.Wrapper3>
                        <h4 className="mb-2 mt-2">{tweet.username} {this.props.isAuthenticated&&this.props.userid===tweet.userid?<Button onClick={this.onDeleteClick.bind(this,tweet._id)} className="btn btn-sm float-right" color="danger">Delete</Button>:null}</h4>
                        <this.Line/>
                        <p>{tweet.message}</p>
                        {tweet.imageURL?<Media src={tweet.imageURL} style={imageStyle} />:null}
                        <hr />
                        <h6>Comments:</h6>
                        {tweet.comments.map((comment)=>(
                            <div key={comment._id} className="ml-2">
                                <p>{comment.username}: {comment.message}</p>
                            </div>
                        ))}
                        {this.props.isAuthenticated?<CommentPoster id={tweet._id}/>:<div></div>}
                        <div className="mt-1">
                        
                        </div>
                        </this.Wrapper3>
                    </this.Wrapper2>
                ))}
            </this.Wrapper>
        )
    }
}

TweetFeed.propTypes = {
    getTweets: PropTypes.func.isRequired,
    tweet: PropTypes.object.isRequired
}

const mapStateToProps = (curState) => ({
    tweet: curState.tweet,
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated,
    userid: curState.tweet.userid
});

export default connect(mapStateToProps,{getTweets, deleteTweet, postComment})(TweetFeed);
