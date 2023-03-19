import { combineReducers } from "@reduxjs/toolkit";
import films from './films/reducer';
import auth from './auth/reducer';

const createRootReducer = () =>
	combineReducers({ films, auth });

export default createRootReducer;