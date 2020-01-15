import axios from 'axios';
import { ADD_ERROR_MESSAGE, REMOVE_ERROR_MESSAGE, ADD_SUCCESS_LOGIN, LOGOUT, ADD_USER } from './types';

export const addSuccessLogin = (username) => {
    console.log(username);
    return {
        type: ADD_SUCCESS_LOGIN,
        data: username
    };
}

export const logout = () => {
    return {
        type: LOGOUT
    };
}

export const addUser = (username) =>{
    return{
        type: ADD_USER,
        data: username
    }
}
