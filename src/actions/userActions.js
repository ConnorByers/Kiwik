import { ADD_SUCCESS_LOGIN, LOGOUT, ADD_USER, CHANGE_PROFILE_PICTURE } from './types';
import history from '../history';
import axios from 'axios';
import { RESTAPI_ENDPOINT } from '../config';

export const addSuccessLogin = (user) => {
    return {
        type: ADD_SUCCESS_LOGIN,
        data: user
    };
}

export const logout = () => {
    return (dispatch) => {
        axios.post(`${RESTAPI_ENDPOINT}/api/users/logout`).then(res=>{
            dispatch( {
                type: LOGOUT
            });
        }).catch((err)=>{
            console.log(err);
            alert('Failed To Logout')
        });
    }
}

export const addUser = (user) =>{
    return{
        type: ADD_USER,
        data: user
    }
}

export const changeProfilePicture = (url, userId) => {
    return {
        type: CHANGE_PROFILE_PICTURE,
        data: { url, userId }
    }
};

export const checkForUserCookie = (user) => {
    return (dispatch, getState) => {
        axios.get(`${RESTAPI_ENDPOINT}/api/users/checkcookie`)
            .then(res => {
                dispatch(addUser({ username: res.data.username, id: res.data.id, profilepic: res.data.profilepic }));
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
        axios.post(`${RESTAPI_ENDPOINT}/api/users`, newUser)
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
        axios.post(`${RESTAPI_ENDPOINT}/api/users/auth`, newUser)
            .then(res => {
                if(res.data.success){
                    dispatch(addSuccessLogin({ username: res.data.username, id: res.data.id, profilepic: res.data.profilepic }));
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

export const uploadProfilePicture = (picture, userId) => {
    return (dispatch, getState) => {
        const formData = new FormData();
        formData.append("avatar", picture);
        formData.append("userId", userId);
        axios.post(`${RESTAPI_ENDPOINT}/api/users/profilepic`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            dispatch(changeProfilePicture(res.data.profilepic, userId));
        }).catch((e)=>{
            console.log(e);
        });
    };
};
