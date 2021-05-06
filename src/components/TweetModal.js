import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postTweet, patchTweet } from '../actions/tweetActions';
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
    const [picture, setPicture] = useState(undefined);
    const [invalidFileTypeFlag, setInvalidFileTypeFlag] = useState(false);
    const [emptyMessageFlag, setEmptyMessageFlag] = useState(false);
    useEffect(()=>{
        if (props.edit) {
            setTweetMessage(props.tweet.message);
        }
    }, [props.isOpen]);

    const onClose = () => {
        setTweetMessage('');
        setPicture(undefined);
        setEmptyMessageFlag(false);
        setInvalidFileTypeFlag(false);
        props.setOpen(false);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (picture) {
            const file_ext = picture.name.split('.').pop();
            if (!['jpg', 'jpeg', 'png'].includes(file_ext)){
                setInvalidFileTypeFlag(true);
                setPicture('');
                return;
            }
        }
        if (!picture && !tweetMessage) {
            setEmptyMessageFlag(true);
            return;
        }
        if(props.edit) {
            props.patchTweet(props.tweet._id, { message: tweetMessage, picture });
        } else {
            props.postTweet({ username: props.username, message: tweetMessage, userid: props.userid, picture });
        }
        onClose();
    };
    return (
        <ReactModal 
           isOpen={props.isOpen}
           onRequestClose={onClose}
           style={customStyles}
        >
            <div className="modalWrapper">
                <h3 className="modalHeader">{props.edit ? 'Edit Your Tweet' : 'Enter your Tweet'}</h3>
                <Input id="Message" type="textarea" value={tweetMessage} setValue={setTweetMessage} placeholder="Message" />
                <div className="tweetModalInner">
                    <Button setFile={setPicture} setErrorFlag={setInvalidFileTypeFlag} color="lightblue" file>Select File</Button>
                    {picture &&
                        <p>Selected: {picture.name}</p>
                    }
                    {invalidFileTypeFlag &&
                        <p className="errortext">File must be a .jpg, .jpeg or .png</p>
                    }
                    {emptyMessageFlag &&
                        <p className="errortext">Message must not be empty</p>
                    }
                    <Button onClick={onSubmit}>Submit</Button>
                </div>
                
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
    patchTweet,
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetModal);
