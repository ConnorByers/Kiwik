import React, { useState, useEffect } from 'react'
import TweetFeed from './TweetFeed';
import TweetPoster from './TweetPoster';
import TopBar from './TopBar';
import SignInBox from './SignInBox';
import { connect } from 'react-redux';
import axios from 'axios';
import { addUser } from '../actions/userActions';
import logo from '../kiwi.svg';

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

    render() {
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
                <div className="Container">
                    <div className="leftbar">
                        <div className="leftbarinner">
                            <div className="logoWrapper">
                                <img src={logo} className="logo" />
                            </div>
                            <p>Hello</p>
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
}

const mapStateToProps = (curState)=>({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated
});

const mapDispatchToProps = {
    addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
