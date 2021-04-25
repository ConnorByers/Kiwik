import React, { useState, useEffect } from 'react'
import TweetFeed from './TweetFeed';
import SignInBox from './SignInBox';
import { connect } from 'react-redux';
import axios from 'axios';
import { checkForUserCookie, logout } from '../actions/userActions';
import logo from '../kiwi.svg';
import Button from './Button';
import TweetModal from './TweetModal';
import icon from '../icon.png';
import Badge from './Badge';

const MainPage = (props) => {
    useEffect(()=>{
        props.checkForUserCookie()
    }, []);

    const [isTweetPosterModalOpen, setTweetPosterModalOpen] = useState(false);

    const doLogout = () => {
        props.logout();
    };

    return (
        <div>
            <TweetModal isOpen={isTweetPosterModalOpen} setOpen={setTweetPosterModalOpen} />
            <div className="Container">
                <div className="left">
                    <div className="leftbar">
                        <div className="leftbarwrapper">
                            <div className="leftbarinner">
                                <div className="logoWrapper">
                                    <div className="logoinner">
                                        <img src={logo} className="logo" />
                                    </div>
                                </div>
                                {props.isAuthenticated &&
                                    <div className="profileContainer">
                                        <div className="tweetButtonWrapper">
                                            <Button onClick={()=>setTweetPosterModalOpen(true)}>Tweet</Button>
                                        </div>
                                        <div className="profileWrapper">
                                            <div className="profileInnerWrapper">
                                                <img src={icon} className="profilepic" />
                                            </div>
                                            <div className="profileNameWrapper">
                                                <p className="profileNameText">{props.username}</p>
                                            </div>
                                            <div className="addCommentWrapper">
                                                <Badge onClick={doLogout} color="red">
                                                    <p className="badgeText">Logout</p>
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="rightinner">
                        <div className="tweetFeedWrapper">
                            <TweetFeed /> 
                        </div>
                        {!props.isAuthenticated && 
                            <div className="rightbar">
                                <SignInBox />
                            </div>
                        } 
                    </div>
                </div>
                 
            </div>
            
        </div>
    )
}

const mapStateToProps = (curState)=>({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated
});

const mapDispatchToProps = {
    checkForUserCookie,
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
