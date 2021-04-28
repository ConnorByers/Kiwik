import React, { useState } from 'react';
import { connect } from 'react-redux';
import Comments from './Comments';
import icon from '../icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Badge from './Badge';
import { getTweets, deleteTweet, postComment, patchTweet } from '../actions/tweetActions';
import TweetModal from './TweetModal';

function Tweet(props) {
    const [editTweetModalOpen, setEditTweetModalOpen] = useState(false);

    const deleteTweet = () => {
        props.deleteTweet(props.tweet._id);
    };

    return (
        <>
            <div key={props.tweet._id} className="tweetWrapper">
                <TweetModal edit isOpen={editTweetModalOpen} setOpen={setEditTweetModalOpen} tweet={props.tweet} />
                <div className="profilePictureWrapper">
                    <div className="innerProfilePictureWrapper">
                        <img src={icon} className="profilePicture" />
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
                {(props.isAuthenticated && props.userid===props.tweet.userid) &&
                    <>
                        <Badge leftoffset icon onClick={()=>setEditTweetModalOpen(true)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Badge>
                        <Badge icon onClick={deleteTweet}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </Badge>
                    </>
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
