import { GET_TWEETS, POST_TWEET, POST_COMMENT, DELETE_TWEET, ADD_SUCCESS_LOGIN, LOGOUT, ADD_USER, PATCH_TWEET, CHANGE_PROFILE_PICTURE, GET_TRENDING_WORDS, ADD_TWEETS, CHANGE_VALUE } from '../actions/types';

const initState = {
    tweets: [],
    username:'',
    isAuthenticated: false,
    userid:'',
    profilePicUrl: '',
    trendingWords: [],
    tweetSetNumber: 0,
    areTweetsLoading: false,
    reachedEndOfTweets: false,
    trendingWordPage: '',
}

export default function(state=initState,action){
    switch(action.type){
        case GET_TWEETS:
            return {
                ...state,
                tweets: action.data
            }
        case POST_TWEET:
            if (!state.trendingWordPage) {
                return {
                    ...state,
                    tweets: [action.data,...state.tweets]
                }
            } else if (action.data.message.includes(state.trendingWordPage)){
                return {
                    ...state,
                    tweets: [action.data,...state.tweets]
                }
            } else {
                return {
                    ...state
                }
            }
        case POST_COMMENT:
            return {
                ...state,
                tweets: state.tweets.map(tweet=>tweet._id === action.data._id ? { ...tweet, ...action.data } : tweet)
            }
        case PATCH_TWEET:
            if (!state.trendingWordPage) {
                return {
                    ...state,
                    tweets: state.tweets.map(tweet=>tweet._id === action.data._id ? { ...tweet, ...action.data } : tweet)
                }
            } else if (action.data.message.includes(state.trendingWordPage)) {
                return {
                    ...state,
                    tweets: state.tweets.map(tweet=>tweet._id === action.data._id ? { ...tweet, ...action.data } : tweet)
                }
            } else {
                return {
                    ...state,
                    tweets: state.tweets.filter((tweet)=>tweet._id!==action.data._id)
                }
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
        case GET_TRENDING_WORDS:
            return {
                ...state,
                trendingWords: action.data,
            }
        case ADD_TWEETS:
            return {
                ...state,
                tweets: [...state.tweets, ...action.data],
                tweetSetNumber: state.tweetSetNumber + 1,
            }
        case CHANGE_VALUE:
            return {
                ...state,
                [action.key]: action.value
            }
        default:
            return state;
    }
}