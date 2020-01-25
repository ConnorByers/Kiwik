import React, { Component } from 'react'
import {connect} from 'react-redux';
import Axios from 'axios';
import styled from 'styled-components';
import { FaKiwiBird } from 'react-icons/fa';
class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        console.log(newUser.username);
        Axios.post('/api/users',newUser)
        .then(res=>{
            console.log('Thing here:')
            console.log(res.data.success);
            if(res.data.success){
                this.props.history.push('/');
            }
            else{
                alert(res.data.message);
            }
        }).catch(()=>{
            console.log("Problem registering");
            alert('Register Attempt failed. Please try again');
        });
        console.log(this.state);
        this.setState({username: '',
        email: '',
        password: ''});
    }
    onChange = (e) => {this.setState({[e.target.id]: e.target.value});}
    bigDiv = styled.div`
    background: #A2C7E5;
    box-sizing: border-box;
    background-size: 200% 100% !important;
    height: 100vh;
    margin:0;
    padding: 0;
    background: linear-gradient(45deg, #49D49D 10%, #A2C7E5 90%);
    `;
    margDiv = styled.div`
    box-sizing: border-box;
    background-size: 200% 100% !important;
    height: 100vh
    `;
    user = styled.div`
        width: 90%;
        max-width: 340px;
        margin: 0 auto;
        padding-top: 10vh;
        font-family: Helvetica;
    `;
    userHeader = styled.header`
        margin: 0;
        text-align: center;
    `;
    userTitle = styled.h1`
        font-size: 20px;
        margin-bottom: -10px;
        font-weight: 500;
        color: white;
    `;

    form = styled.form`
        margin-top: 40px;
        border-radius: 6px;
        overflow: hidden;
    `;

    formInput = styled.input`
        display: block;
        width: 100%;
        padding: 20px;
        font-family: Helvetica;
        -webkit-appearance: none;
        border: 0;
        
    `;

    btn = styled.button`
        display: block;
        width: 100%;
        padding: 20px;
        font-family: Helvetica;
        -webkit-appearance: none;
        outline: 0;
        border: 0;
        color: white;
        background: #ABA194;
    `;
    render() {
        return (
            <this.bigDiv>
            <this.user>
                <this.userHeader>
                    <FaKiwiBird size={50}/>
                    <this.userTitle>Register</this.userTitle>
                </this.userHeader>
                
                <this.form onSubmit={this.onSubmit}>
                    <div>
                        <this.formInput onChange={this.onChange} type="text" id="username" value={this.state.username} placeholder="Username"/>
                    </div>
                    
                    <div>
                        <this.formInput onChange={this.onChange} type="email" id="email" value={this.state.email} placeholder="Email" />
                    </div>
                    
                    <div>
                        <this.formInput onChange={this.onChange} type="password" id="password" value={this.state.password} placeholder="Password" />
                    </div>
                    
                    <this.btn onClick={this.onSubmit} type="button">Register</this.btn>
                </this.form>
            </this.user>
            </this.bigDiv>
        )
    }
}


/*
<Container className="App">
                    <h1 className="mt-5 mb-5">Register</h1>
                    <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                            <Label>Username: </Label>
                            <Input onChange={this.onChange} type="text" id="username" value={this.state.username} placeholder="Username"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email: </Label>
                            <Input onChange={this.onChange} type="email" id="email" value={this.state.email} placeholder="Email"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password: </Label>
                            <Input onChange={this.onChange} type="password" id="password" value={this.state.password} placeholder="Password"/>
                        </FormGroup>
                        <FormGroup>
                            <Button onSubmit={this.onSubmit}>Register</Button>
                        </FormGroup>
                    </Form>
                </Container>
*/ 
export default connect()(RegisterPage);
