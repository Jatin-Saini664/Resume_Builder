import React from 'react'
import { bindActionCreators } from 'redux';
import initialState from "./InitialState.json";

const authReducer = (state=initialState.auth, action) => {
    switch(action.type){
        case "Sign-In-Failed":
            return {loading:false, ErrorMessage:action.error}
        case "Sign-In-Request":
            return {loading:true, ErrorMessage:""}
        case "Sign-In-Success":
            return {loading:false, ErrorMessage:""}
        case "Register-Request":
            return {loading:true, ErrorMessage:""}
        case "Register-Success":
            return {loading:false, ErrorMessage:""}
        case "Register-Failed":
            return {loading:false, ErrorMessage:action.error}
        case "Sign-Out-Failed":
            return {loading:false, ErrorMessage:action.error}
        case "Remove-Error":
            return {loading:false, ErrorMessage:""}
        default:
            return state;
    }
}
 
export default authReducer;