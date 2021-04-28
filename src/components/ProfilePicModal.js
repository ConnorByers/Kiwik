import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { uploadProfilePicture } from '../actions/userActions';
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

function ProfilePicModal(props) {
    const [picture, setPicture] = useState('');
    const [noFileSelectedFlag, setNoFileSelectedFlag] = useState(false);
    const [invalidFileTypeFlag, setInvalidFileTypeFlag] = useState(false);
    const onClose = () => {
        setPicture('');
        props.setOpen(false);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (!picture){
            setNoFileSelectedFlag(true);
            return;
        }
        const file_ext = picture.name.split('.').pop();
        if (!['jpg', 'jpeg', 'png'].includes(file_ext)){
            setInvalidFileTypeFlag(true);
            setPicture('');
            return;
        }
        props.uploadProfilePicture(picture, props.userid);
        onClose();
    };
    return (
        <ReactModal 
           isOpen={props.isOpen}
           onRequestClose={onClose}
           style={customStyles}
        >
            <div className="modalWrapper">
                <h3 className="modalHeader">Upload your picture</h3>
                <Button setFile={setPicture} setErrorFlag={setInvalidFileTypeFlag} file>Select File</Button>
                {picture &&
                    <p>Selected: {picture.name}</p>
                }
                {noFileSelectedFlag &&
                    <p className="errortext">File Must Be Selected</p>
                }
                {invalidFileTypeFlag &&
                    <p className="errortext">File must be a .jpg, .jpeg or .png</p>
                }
                <Button onClick={onSubmit}>Submit</Button>
            </div>
        </ReactModal>
    )
}

const mapStateToProps = (curState) => ({
    userid: curState.tweet.userid
});

const mapDispatchToProps = {
    uploadProfilePicture,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicModal);
