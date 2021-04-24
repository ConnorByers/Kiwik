import React, { useState } from 'react'
import { connect } from 'react-redux'
import { postTweet } from '../actions/tweetActions';
import ReactModal from 'react-modal';
import Button from './Button';
import Input from './Input';

ReactModal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
  }
};

function TweetModal(props) {
    const [tweetMessage, setTweetMessage] = useState('');
    const onClose = () => {
        setTweetMessage('');
        props.setOpen(false);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        props.postTweet({ username: props.username, message: props.message, userid: props.userid });
        onClose();
    };
    return (
        <ReactModal 
           isOpen={props.isOpen}
           onRequestClose={onClose}
           style={customStyles}
        >
            <div className="modalWrapper">
                <h3 className="modalHeader">Enter your Tweet</h3>
                <Input id="Message" type="textarea" value={tweetMessage} setValue={setTweetMessage} placeholder="Message" />
                <Button onClick={onSubmit}>Close Modal</Button>
            </div>
        </ReactModal>
    )
}

const mapStateToProps = (curState) => ({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated,
    userid: curState.tweet.userid
});

const mapDispatchToProps = {
    postTweet,
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetModal);
