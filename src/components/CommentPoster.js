import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postComment } from '../actions/tweetActions';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

class CommentPoster extends Component {
    constructor(props){
        super(props);
        this.state={message: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.postComment(this.props.id, {username: this.props.username, message: this.state.message});
        this.setState({message: ''});
    }
    onChange = (e) => {this.setState({message: e.target.value});}
    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Label>Add Comment:</Label>
                    <Input className="w-50" type="text" value={this.state.message} onChange={this.onChange}/>
                    <Button size="sm"color="info">Submit</Button>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (curState)=>({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated
});
export default connect(mapStateToProps,{postComment})(CommentPoster);