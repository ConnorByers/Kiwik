import React, { Component } from 'react'
import TweetFeed from './TweetFeed';
import TweetPoster from './TweetPoster';
import TopBar from './TopBar';
import {connect} from 'react-redux';
import axios from 'axios';
import {Container} from 'reactstrap';
import {addUser} from '../actions/userActions';
import styled from 'styled-components';

class MainPage extends Component {
    componentDidMount(){
        axios.get('api/users/checkcookie')
        .then(res=>{
            console.log(`User Found is ${res.data.username}`);
            this.props.addUser(res.data.username);
        }).catch((err)=>{
            console.log("No saved cookie");
        });
    }
    background = styled.div`
    background: #DDDDDD;
    `;
    tweetPosterBackground = styled.div`
    background: white;
    border-radius: 25px;
    border: 2px solid lightblue;
    `;
    welcome = styled.h1`
	text-align:center;
	text-shadow:1px 1px 1px black;
	font-size:50px;
    `;
    render() {
        //const isAuthenticated = this.props.username;
        return (
                <this.background>
                    <TopBar />
                    {this.props.isAuthenticated?
                     <this.welcome>Welcome {this.props.username}</this.welcome> : null
                }
                    <Container>
                        {this.props.isAuthenticated?<this.tweetPosterBackground><TweetPoster /></this.tweetPosterBackground>:null}
                        <TweetFeed /> 
                    </Container>  
                </this.background>
        )
    }
}

const mapStateToProps = (curState)=>({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated
});

export default connect(mapStateToProps,{addUser})(MainPage);
