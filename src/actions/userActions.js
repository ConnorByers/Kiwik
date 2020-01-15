import axios from 'axios';
import { ADD_ERROR_MESSAGE, REMOVE_ERROR_MESSAGE, ADD_SUCCESS_LOGIN, LOGOUT, ADD_USER } from './types';

export const addSuccessLogin = (user) => {
    console.log(user);
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
