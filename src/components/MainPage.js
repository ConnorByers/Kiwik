import React, { useState, useEffect } from 'react'
import TweetFeed from './TweetFeed';
import SignInBox from './SignInBox';
import { connect } from 'react-redux';
import axios from 'axios';
import { checkForUserCookie, logout } from '../actions/userActions';
import logo from '../kiwi.svg';
import Button from './Button';
import TweetModal from './TweetModal';
import ProfilePicModal from './ProfilePicModal';
import icon from '../icon.png';
import Badge from './Badge';
import ProfileOptionMenu from './ProfileOptionMenu';
import TrendingWords from './TrendingWords';
import { useLocation } from 'react-router-dom';
import { redirectToHome } from '../actions/tweetActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MainPage = (props) => {
    let query = useQuery();
    const [trendingQueryParam, setTrendingQueryParam] = useState(null);
    useEffect(()=>{
        props.checkForUserCookie();
    }, []);

    useEffect(()=>{
        setTrendingQueryParam(query.get('topic'));
    });

    const [isTweetPosterModalOpen, setTweetPosterModalOpen] = useState(false);
    const [isUploadProfilePicModalOpen, setUploadProfilePicOpen] = useState(false);
    const doLogout = () => {
        props.logout();
    };

    return (
        <div>
            <TweetModal isOpen={isTweetPosterModalOpen} setOpen={setTweetPosterModalOpen} />
            <ProfilePicModal isOpen={isUploadProfilePicModalOpen} setOpen={setUploadProfilePicOpen} />
            <div className="Container">
                <div className="left">
                    <div className="leftbar">
                        <div className="leftbarwrapper">
                            <div className="leftbarinner">
                                <div className="lefttop">
                                    <div className="logoWrapper">
                                        <div className="logoinner">
                                            <img src={logo} className="logo" />
                                        </div>
                                    </div>
                                    <div className="homeButtonWrapper" onClick={props.redirectToHome}>
                                        <FontAwesomeIcon icon={faHome} size="2x" fixedWidth style={{color: "black"}} />
                                        <p className="homeButtonText">Home</p>
                                    </div>
                                </div>
                                {props.isAuthenticated &&
                                    <div className="profileContainer">
                                        <div className="tweetButtonWrapper">
                                            <Button onClick={()=>setTweetPosterModalOpen(true)}>Tweet</Button>
                                        </div>
                                        <div className="profileWrapper">
                                            <div className="profileInnerWrapper">
                                                <img src={props.profilePicUrl || icon} className="profilepic" />
                                            </div>
                                            <div className="profileNameWrapper">
                                                <p className="profileNameText">{props.username}</p>
                                            </div>
                                            <ProfileOptionMenu logout={doLogout} setUploadProfilePicOpen={setUploadProfilePicOpen} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <div className="smallScreenProfileOptionsWrapper">
                        {props.isAuthenticated ?
                            <div className="profileContainer">
                                <div className="profileWrapper">
                                    <div className="iconusernamewrapper">
                                        <div className="profileInnerWrapper">
                                            <img src={props.profilePicUrl || icon} className="profilepic" />
                                        </div>
                                        <div className="profileNameWrapper">
                                            <p className="profileNameText">{props.username}</p>
                                        </div>
                                    </div>
                                    <div className="accountBadgeWrapper">
                                        <Badge onClick={()=>setUploadProfilePicOpen(true)} color="blue">
                                            <p className="badgeText">Change Profile Picture</p>
                                        </Badge>
                                        <Badge onClick={doLogout} color="red">
                                            <p className="badgeText">Logout</p>
                                        </Badge>
                                    </div>
                                </div>
                                <div className="tweetButtonWrapper">
                                    <Button onClick={()=>setTweetPosterModalOpen(true)}>Tweet</Button>
                                </div>
                            </div>
                            :
                            <SignInBox />
                        }
                    </div>
                    <div className="tweetFeedWrapper">
                        <TweetFeed trendingQueryParam={trendingQueryParam} /> 
                    </div>
                </div>
                <div className="right">
                    <div className="rightbar">
                        {!props.isAuthenticated && 
                            <SignInBox />
                        }
                        <TrendingWords />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = (curState)=>({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated,
    profilePicUrl: curState.tweet.profilePicUrl,
});

const mapDispatchToProps = {
    checkForUserCookie,
    logout,
    redirectToHome
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
