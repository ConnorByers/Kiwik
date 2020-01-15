import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postTweet } from '../actions/tweetActions';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styled from 'styled-components';

class TweetPoster extends Component {
    constructor(props){
        super(props);
        this.state={message: '',addImage:false,imageUrl:''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onImageUrlChange = this.onImageUrlChange.bind(this);
    }
    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.message);
        if(this.state.imageUrl===''&&!this.state.addImage){
            this.props.postTweet({username: this.props.username, message: this.state.message});
        }
        else{
            this.props.postTweet({username: this.props.username, message: this.state.message,imageURL:this.state.imageUrl});
        }
        this.setState({message: '',addImage:false,imageUrl:''});
    }
    onChange = (e) => {this.setState({message: e.target.value});}
    onImageUrlChange = (e) => {this.setState({imageUrl: e.target.value});}
    toggle = () => {
        this.setState({addImage:!this.state.addImage});
    }
    Wrapper = styled.div`
    margin: 30px;
    `;
    render() {
        return (
            <this.Wrapper>
                <Form onSubmit={this.onSubmit}>
                    <Label>Message:</Label>
                    <Input type="text" value={this.state.message} onChange={this.onChange}/>
                    <FormGroup>
                        <Input className="ml-2" type="checkbox" onClick={this.toggle}/>
                        <p className="ml-4">Add Image</p>
                        {this.state.addImage?<Input type="text" className="w-50" value={this.state.imageUrl} onChange={this.onImageUrlChange}/>:null}
                    </FormGroup>
                    
                    <div></div>
                    <Button>Submit</Button>
                </Form>
            </this.Wrapper>
        )
    }
}
const mapStateToProps = (curState)=>({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated
});
export default connect(mapStateToProps,{postTweet})(TweetPoster);
