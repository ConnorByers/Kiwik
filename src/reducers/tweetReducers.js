import { GET_TWEETS, POST_TWEET, POST_COMMENT, DELETE_TWEET, ADD_SUCCESS_LOGIN, LOGOUT, ADD_USER } from '../actions/types';

const initState = {
    tweets: [],
    username:'',
    isAuthenticated: false
}

export default function(state=initState,action){
    switch(action.type){
        case GET_TWEETS:
            return {
                ...state,
                tweets: action.data
            }
        case POST_TWEET:
            return {
                ...state,
                tweets: [action.data,...state.tweets]
            }
        case POST_COMMENT:
            return {
                ...state,
                tweets: state.tweets.map(tweet=>tweet._id === action.data._id ? action.data : tweet)
            }
        case DELETE_TWEET:
            return {
                ...state,
                tweets: state.tweets.filter((tweet)=>tweet._id!==action.data)
            }
        case ADD_SUCCESS_LOGIN:
            return {
                ...state,
                username: action.data,
                isAuthenticated: true
            }
        case LOGOUT:
            return{
                ...state,
                username: null,
                isAuthenticated: false
            }
        case ADD_USER:
            return{
                ...state,
                username: action.data,
                isAuthenticated: true
            }
        default:
            return state;
    }
}