import React, { useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import Input from './Input';
import Button from './Button';
import { login } from '../actions/userActions';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        props.login(email, password);
        setPassword('');
        setEmail('');
    };

    return (
        <div className="formWrapper">
            <h1>Log In to Kiwik</h1>
            <Input id="email" type="email" value={email} setValue={setEmail} placeholder="Email" />
            <Input id="password" type="password" value={password} setValue={setPassword} placeholder="Password" />
            <Button onClick={onSubmit}>Login</Button>
        </div>
    )

}

export default connect(null, { login })(LoginPage);
