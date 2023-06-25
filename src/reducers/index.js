import { combineReducers } from "redux";
import { reducer as posts } from './posts';
import authReducer from './auth'

export default combineReducers({ posts ,authReducer });