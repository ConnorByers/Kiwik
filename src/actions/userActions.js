import { ADD_SUCCESS_LOGIN, LOGOUT, ADD_USER } from './types';
import history from '../history';
import axios from 'axios';

export const addSuccessLogin = (user) => {
    return {
        type: ADD_SUCCESS_LOGIN,
        data: user
    };
}

export const logout = () => {
    return {
        type: LOGOUT
    };
}

export const addUser = (user) =>{
    return{
        type: ADD_USER,
        data: user
    }
}

export const checkForUserCookie = (user) => {
    return (dispatch, getState) => {
        axios.get('api/users/checkcookie')
            .then(res => {
                dispatch(addUser({ username: res.data.username, id:res.data.id }));
            }).catch((err) => {
                console.log("No saved cookie");
            });
    };
};

export const register = (username, email, password) => {
    return (dispatch, getState) => {
        const newUser = {
            username,
            email,
            password,
        };
        axios.post('/api/users', newUser)
        .then(res => {
            if(res.data.success) {
                history.push('/');
            }
            else {
                alert(res.data.message);
            }
        }).catch(() => {
            alert('Register Attempt failed. Please try again');
        });
    };
};

export const login = (email, password) => {
    return (dispatch, getState) => {
        const newUser = {
            email,
            password,
        };
        axios.post('/api/users/auth', newUser)
            .then(res => {
                if(res.data.success){
                    dispatch(addSuccessLogin({ username: res.data.username, id: res.data.id }));
                    history.push('/');
                }
                else{
                    alert(res.data.msg);
                }
            }).catch(() => {
                alert('Login Attempt failed. Please try again');
            });
    }
}
