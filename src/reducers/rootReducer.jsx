import React from 'react'
import InitialState from './InitialState.json';
import {firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase";
import documentReducer from './documentReducers';
import contactReducer from './contactReducer';
import educationReducer from './educationReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    document:documentReducer,
    contact:contactReducer,
    educationContent:educationReducer,
    auth:authReducer
  });

const rootReducer = (state=InitialState, action) => {
    if(action.type==="Sign-Out"){
        state=undefined;
    }
    return appReducer(state, action);
}
 
export default rootReducer;