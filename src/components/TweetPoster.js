import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postTweet } from '../actions/tweetActions';

class TweetPoster extends Component {
    constructor(props){
        super(props);
        this.state={ message: '', addImage:false, imageUrl:'' };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onImageUrlChange = this.onImageUrlChange.bind(this);
    };
    onSubmit = e => {
        e.preventDefault();
        if (this.state.imageUrl==='' && !this.state.addImage) {
            this.props.postTweet({ username: this.props.username, message: this.state.message, userid: this.props.userid });
        } else {
            this.props.postTweet({ username: this.props.username, message: this.state.message, imageURL:this.state.imageUrl, userid: this.props.userid });
        }
        this.setState({ message: '', addImage: false, imageUrl: '' });
    };
    onChange = (e) => {
        this.setState({ message: e.target.value });
    };
    onImageUrlChange = (e) => {
        this.setState({ imageUrl: e.target.value });
    };
    toggle = () => {
        this.setState({ addImage: !this.state.addImage });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Message:</label>
                    <input type="text" value={this.state.message} onChange={this.onChange} />
                    <input type="checkbox" checked={this.state.addImage} onClick={this.toggle}/>
                    <p>Add Image</p>
                    {this.state.addImage && <input type="text" value={this.state.imageUrl} onChange={this.onImageUrlChange} />}
                    <button>Submit</button>
                </form>
            </div>
        )
    };
}

const mapStateToProps = (curState) => ({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated,
    userid: curState.tweet.userid
});

const mapDispatchToProps = {
    postTweet,
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetPoster);
