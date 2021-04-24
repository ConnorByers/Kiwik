import React, { useState, useEffect } from 'react'
import TweetFeed from './TweetFeed';
import TweetPoster from './TweetPoster';
import TopBar from './TopBar';
import SignInBox from './SignInBox';
import { connect } from 'react-redux';
import axios from 'axios';
import { addUser } from '../actions/userActions';
import logo from '../kiwi.svg';
import Button from './Button';
import TweetModal from './TweetModal';
import icon from '../icon.png';
import Badge from './Badge';
const MainPage = (props) => {
    useEffect(()=>{
        axios.get('api/users/checkcookie')
        .then(res => {
            props.addUser({ username: res.data.username, id:res.data.id });
        }).catch((err) => {
            console.log("No saved cookie");
        });
    }, []);

    const [isTweetPosterModalOpen, setTweetPosterModalOpen] = useState(false);

    return (
        <div>
            {props.isAuthenticated &&
                <>
                    <h1>Welcome {props.username}</h1>
                    <div>
                        <TweetPoster />
                    </div>
                </>
            }
            <TweetModal isOpen={isTweetPosterModalOpen} setOpen={setTweetPosterModalOpen} />
            <div className="Container">
                <div className="leftbar">
                    <div className="leftbarinner">
                        <div className="logoWrapper">
                            <div className="logoinner">
                                <img src={logo} className="logo" />
                            </div>
                        </div>
                        <div className="profileContainer">
                            <div className="tweetButtonWrapper">
                                <Button onClick={()=>setTweetPosterModalOpen(true)}>Tweet</Button>
                            </div>
                            <div className="profileWrapper">
                                <div className="profileInnerWrapper">
                                    <img src={icon} className="profilepic" />
                                </div>
                                <div className="profileNameWrapper">
                                    <p className="profileNameText">Connor Byers</p>
                                </div>
                                <Badge onClick={()=>console.log('clicked')} color="red">
                                    <p className="badgeText">Logout</p>
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tweetFeedWrapper">
                    <TweetFeed /> 
                </div>  
                <div className="rightbar">
                    <SignInBox />
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
    addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
