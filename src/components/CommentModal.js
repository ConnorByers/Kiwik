import React, { useState } from 'react'
import { connect } from 'react-redux'
import { postComment } from '../actions/tweetActions';
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

function CommentModal(props) {
    const [commentMessage, setCommentMessage] = useState('');
    const onClose = () => {
        setCommentMessage('');
        props.setOpen(false);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        props.postComment(props.tweetId, { username: props.username, message: commentMessage });
        onClose();
    };
    return (
        <ReactModal 
           isOpen={props.isOpen}
           onRequestClose={onClose}
           style={customStyles}
        >
            <div className="modalWrapper">
                <h3 className="modalHeader">Enter your Comment</h3>
                <Input id="Message" type="textarea" value={commentMessage} setValue={setCommentMessage} placeholder="Message" />
                <Button onClick={onSubmit}>Submit</Button>
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
    postComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal);
