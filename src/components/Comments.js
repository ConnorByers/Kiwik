import React, { useState } from 'react';
import { connect } from 'react-redux';
import Badge from './Badge';
import CommentModal from './CommentModal';

function Comments(props) {
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!isOpen);
    };
    const [isCommentModalOpen, setCommentModalOpen] = useState(false);
    return (
        <div className="commentSectionWrapper">
            <CommentModal setOpen={setCommentModalOpen} isOpen={isCommentModalOpen} tweetId={props.tweet._id} />
            {props.tweet.comments && props.tweet.comments.length > 0 &&
            <>
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
            </>
            }
            {props.isAuthenticated &&
                <div className="addCommentWrapper">
                    <Badge onClick={()=>setCommentModalOpen(true)} color="blue">
                        <p className="badgeText">Add Comment</p>
                    </Badge>
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
