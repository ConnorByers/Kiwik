import React, { Component } from 'react'
import { getTweets, deleteTweet, postComment, patchTweet } from '../actions/tweetActions';
import { connect } from 'react-redux';
import CommentPoster from './CommentPoster';
import Comments from './Comments';
import icon from '../icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Badge from './Badge';

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
                    <div key={tweet._id} className="tweetWrapper">
                        <div className="profilePictureWrapper">
                            <div className="innerProfilePictureWrapper">
                                <img src={icon} className="profilePicture" />
                            </div>
                        </div>
                        <div className="tweetContentWrapper">
                            <div className="usernameWrapper">
                                <p className="usernameText">
                                    {tweet.username}
                                </p>
                            </div>
                            {(this.props.isAuthenticated && this.props.userid===tweet.userid) &&
                                <button onClick={this.onDeleteClick.bind(this,tweet._id)}>
                                    Delete
                                </button>
                            }
                            {this.props.isAuthenticated &&
                                <>
                                    <input type="text" value={this.state.message} onChange={this.onChange}/>
                                    <button onClick={this.onUpdateClick.bind(this, tweet._id, this.state.message)}>Update</button>
                                </>
                            }
                            <div className="messageWrapper">
                                <p className="messageText">{tweet.message}</p>
                            </div>
                            {tweet.imageURL && <img src={tweet.imageURL} />}
                            <Comments tweet={tweet} />
                            {this.props.isAuthenticated && <CommentPoster id={tweet._id}/>}
                        </div>
                        <Badge leftoffset icon>
                            <FontAwesomeIcon icon={faEdit} />
                        </Badge>
                        <Badge icon>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </Badge>
                    </div>
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
