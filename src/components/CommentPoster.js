import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postComment } from '../actions/tweetActions';

class CommentPoster extends Component {
    constructor(props){
        super(props);
        this.state={message: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.postComment(this.props.id, { username: this.props.username, message: this.state.message });
        this.setState({ message: '' });
    }
    onChange = (e) => { this.setState({ message: e.target.value }); }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Add Comment:</label>
                    <input type="text" value={this.state.message} onChange={this.onChange}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (curState)=>({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated
});

const mapDispatchToProps = {
    postComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentPoster);