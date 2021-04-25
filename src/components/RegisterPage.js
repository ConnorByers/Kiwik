import React, { useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import Input from './Input';
import Button from './Button';
import { register } from '../actions/userActions';

const RegisterPage = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        props.register(username, email, password);
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="formWrapper">
            <h1>Sign Up to Kiwik</h1>
            <Input id="username" type="text" value={username} setValue={setUsername} placeholder="Username" />
            <Input id="email" type="email" value={email} setValue={setEmail} placeholder="Email" />
            <Input id="password" type="password" value={password} setValue={setPassword} placeholder="Password" />
            <Button onClick={onSubmit}>Register</Button>
        </div>
    )

}

const mapDispatchToProps = {
    register,
};
 
export default connect(null, mapDispatchToProps)(RegisterPage);
