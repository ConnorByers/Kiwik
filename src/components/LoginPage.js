import React, { useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { addSuccessLogin } from '../actions/userActions';
import Input from './Input';
import Button from './Button';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            email,
            password,
        };
        axios.post('/api/users/auth', newUser)
            .then(res => {
                if(res.data.success){
                    props.addSuccessLogin({ username: res.data.username, id: res.data.id });
                    props.history.push('/');
                }
                else{
                    alert(res.data.msg);
                }
            }).catch(() => {
                alert('Login Attempt failed. Please try again');
            });
        setPassword('');
        setEmail('');
    }

    return (
        <div className="formWrapper">
            <h1>Log In to Kiwik</h1>
            <Input id="email" type="email" value={email} setValue={setEmail} placeholder="Email" />
            <Input id="password" type="password" value={password} setValue={setPassword} placeholder="Password" />
            <Button onClick={onSubmit}>Login</Button>
        </div>
    )

}

export default connect(null, { addSuccessLogin })(LoginPage);
