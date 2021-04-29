import { GET_TWEETS, POST_TWEET, POST_COMMENT, DELETE_TWEET, ADD_SUCCESS_LOGIN, LOGOUT, ADD_USER, PATCH_TWEET, CHANGE_PROFILE_PICTURE } from '../actions/types';

const initState = {
    tweets: [],
    username:'',
    isAuthenticated: false,
    userid:'',
    profilePicUrl: '',
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
        case PATCH_TWEET:
            return {
                ...state,
                tweets: state.tweets.map(tweet=>tweet._id === action.data._id ? { ...tweet, ...action.data } : tweet)
            }
        case DELETE_TWEET:
            return {
                ...state,
                tweets: state.tweets.filter((tweet)=>tweet._id!==action.data)
            }
        case ADD_SUCCESS_LOGIN:
            return {
                ...state,
                username: action.data.username,
                userid: action.data.id,
                isAuthenticated: true,
                profilePicUrl: action.data.profilepic || '',
            }
        case LOGOUT:
            return {
                ...state,
                username: null,
                userid: null,
                isAuthenticated: false,
                profilePicUrl: '',
            }
        case ADD_USER:
            return {
                ...state,
                username: action.data.username,
                userid: action.data.id,
                isAuthenticated: true,
                profilePicUrl: action.data.profilepic || '',
            }
        case CHANGE_PROFILE_PICTURE:
            return {
                ...state,
                profilePicUrl: action.data.url,
                tweets: state.tweets.map(tweet=>tweet.userid === action.data.userId ? { ...tweet, tweetprofilepic: action.data.url } : tweet)
            }
        default:
            return state;
    }
}