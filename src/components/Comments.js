import React, { useState } from 'react';
import { connect } from 'react-redux';
import Badge from './Badge';
import CommentModal from './CommentModal';

function Comments(props) {
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!isOpen);
    };
    return (
        <div className="commentSectionWrapper">
            {props.tweet.comments.length !== 0 &&
                <div className="commentsWrapper">
                    {isOpen ?
                        <>
                            <div className="commentline"></div>
                            {props.tweet.comments.map((comment) => (
                                <div key={comment._id}>
                                    <p className="commentuser">{comment.username}:</p>
                                    <p className="commenttext">{comment.message}</p>
                                </div>
                            ))}
                            <a onClick={toggleOpen} className="toggleText">Click to collapse</a>
                        </>
                        :
                        <>
                            <a onClick={toggleOpen} className="toggleText">Click to view comments</a>
                        </>
                    }
                </div>
            }
            
        </div>
    )
}

const mapStateToProps = (curState) => ({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated,
    userid: curState.tweet.userid
});

export default connect(mapStateToProps)(Comments);
