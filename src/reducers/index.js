import { combineReducers } from 'redux';
import tweetReducers from './tweetReducers';

export default combineReducers({
    tweet: tweetReducers
});