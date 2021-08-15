import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
// import { isLoaded } from 'react-redux-firebase';
import './loginPage.css';
import {connect} from "react-redux";

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleOnChange = (e) => {
        console.log(e.target.name=="email");
        if(e.target.name==="email"){
            setEmail(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }

    const handleSignin = () => {
        const userData = {
            email:email,
            password:password
        }
        props.signin(userData);
        history.push("/")
    }
    return (
        <>
        {props.authMine?.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are logging you in</h4>:
        <div className="login-page">
            <div className="section-1"></div>
            <div className="section-2">
                <div className="login-signup-heading">
                    <h3>login</h3>
                </div>
                <div className="login">
                    <input type="email" name="email" id="" onChange={handleOnChange} placeholder="Email" />
                    <input type="password" name="password" id=""  onChange={handleOnChange} placeholder="Password" />
                </div>
                {props.authMine?.ErrorMessage?<div className="input-group full">
                        <span className="error-message" >{props.authMine?.ErrorMessage}</span> 
                </div> :<></>} 
                <button onClick={handleSignin}>Sign-In</button>
            </div>
        </div>}
        </>
    );
}

const mpstp = (state) => {
    return {
        auth:state.firebase.auth,
        authMine:state.auth
    }
}

const mpdtp = (dispatch) => {
    return {
        signin : (userData) => {dispatch(SignIn(userData))}
    }
}

const SignIn = (userData) => {
    return async(dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({type:"Sign-In-Request"})
        const firebase = getFirebase();
        try{
            console.log(userData);
            let data = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
            console.log(data);
            console.log(data.user.id);
            dispatch({type: "Sign-In-Success"})
        }
       catch(err){
           console.log("Error is ", err)
           dispatch({type:"Sign-In-Failed", error:err})
           setTimeout(()=>{
            dispatch({type:"Remove-Error"})
           },2000)
       } 
    }
}


 
export default connect(mpstp, mpdtp)(LoginPage);