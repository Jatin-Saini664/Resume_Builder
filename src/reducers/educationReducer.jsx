import React from 'react';
import initialState from "./InitialState.json";

const educationReducer = (state=initialState, action) => {
    switch(action.type){
        case "Set-Education-Content":
            return action.payload;
        default:
            return state;
    }
}
 
export default educationReducer;