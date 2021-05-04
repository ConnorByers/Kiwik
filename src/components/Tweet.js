import React, { useState } from 'react';
import { connect } from 'react-redux';
import Comments from './Comments';
import icon from '../icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Badge from './Badge';
import { getTweets, deleteTweet, postComment, patchTweet } from '../actions/tweetActions';
import TweetModal from './TweetModal';
import CommentOptionMenu from './CommentOptionMenu';
import CommentModal from './CommentModal';

function Tweet(props) {
    const [editTweetModalOpen, setEditTweetModalOpen] = useState(false);
    const [isCommentModalOpen, setCommentModalOpen] = useState(false);

    const deleteTweet = () => {
        props.deleteTweet(props.tweet._id);
    };

    return (
        <>
            <div key={props.tweet._id} className="tweetWrapper">
                <CommentModal setOpen={setCommentModalOpen} isOpen={isCommentModalOpen} tweetId={props.tweet._id} />
                <TweetModal edit isOpen={editTweetModalOpen} setOpen={setEditTweetModalOpen} tweet={props.tweet} />
                <div className="profilePictureWrapper">
                    <div className="innerProfilePictureWrapper">
                        <img src={props.tweet.tweetprofilepic || icon} className="profilePicture" />
                    </div>
                </div>
                <div className="tweetContentWrapper">
                    <div className="usernameWrapper">
                        <p className="usernameText">
                            {props.tweet.username}
                        </p>
                    </div>
                    <div className="messageWrapper">
                        <p className="messageText">{props.tweet.message}</p>
                        {props.tweet.imageURL && <img className="tweetPicture" src={props.tweet.imageURL} />}
                    </div>
                    <Comments tweet={props.tweet} />
                </div>
                {props.isAuthenticated &&
                    <CommentOptionMenu ownsTweet={props.userid===props.tweet.userid} delete={deleteTweet} setEditTweetModalOpen={setEditTweetModalOpen} setCommentModalOpen={setCommentModalOpen} />
                }
            </div>
        </>
    )
}

const mapStateToProps = (curState) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Tweet)
