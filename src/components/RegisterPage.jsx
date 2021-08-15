import React, {useState} from 'react';
import {connect} from "react-redux";
import { useHistory } from 'react-router';

const RegisterPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleOnChange = (e) => {
        if(e.target.name==="email"){
            setEmail(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }

    const handleRegister = () => {
        const userData = {
            email:email,
            password:password
        }
        props.register(userData);
        history.push("/")
    }
    return (
        <>
        {props.authMine?.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are logging you in</h4>:
        <div className="register-page">
            <div className="section-1"></div>
            <div className="section-2">
                <div className="register-signup-heading">
                    <h3>Register</h3>
                </div>
                <div className="register">
                    <input type="email" name="email" id=""  onChange={handleOnChange} placeholder="Email" />
                    <input type="password" name="password" id=""  onChange={handleOnChange} placeholder="Password" />
                </div>
                {props.authMine?.ErrorMessage?.message?<div className="input-group full">
                        <span className="error-message" >{props.authMine?.ErrorMessage?.message}</span> 
                </div> :<></>} 
                <button onClick={handleRegister}>Register</button>
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
        register: (userData) => {dispatch(Register(userData))}
    }
}

const Register = (userData) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({type: "Register-Request"})
        const firebase = getFirebase();
        const firestore  = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            userData.email,
            userData.password
        )
            .then(async(data)=>{
                const res = await firestore.collection('users').doc(data.user.uid).set({
                    email:userData.email,
                    resumeIds:[]
                });
                dispatch({type: "Register-Success"})
            }).catch((err) => {
                dispatch({type:"Register-Failed", error:err})
            })
    }
}
 
export default connect(mpstp, mpdtp)(RegisterPage);