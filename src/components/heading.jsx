import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {isLoaded, isEmpty} from "react-redux-firebase"
import { useSelector } from 'react-redux';
import './heading.css';



const Heading = (props) => {
    // const [auth, setAuth] = useState(props.auth);
    const history = useHistory();
    const auth = useSelector(state => state.firebase.auth);

    const handleSignout = (e) => {
        props.signout();
        history.push("/");
    }
    return (
        <div className="heading">
            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 80" x="0px" y="0px"><title>Untitled-1</title><path d="M60.25,54.94H53.87V6.74a5.17,5.17,0,0,0-5.16-5.17H5.07A5.16,5.16,0,0,0,0,6.74v4a.49.49,0,0,0,.49.5H9.35V57.26A5.18,5.18,0,0,0,14,62.4a.47.47,0,0,0,.17,0H55.57a5.18,5.18,0,0,0,5.17-5.17V55.43A.49.49,0,0,0,60.25,54.94Zm-7.36,0H19.19a.49.49,0,0,0-.49.49v1.83a4.19,4.19,0,0,1-8.37,0V6.74A5.13,5.13,0,0,0,8.19,2.56H48.71a4.19,4.19,0,0,1,4.18,4.18Z"/><path d="M62,10h-3.4a2.25,2.25,0,0,0-2.06,2.38V45.14a.46.46,0,0,0,.06.22l0,.07L59.81,52a.49.49,0,0,0,.88,0l3.23-6.57a.48.48,0,0,0,.08-.27V12.42A2.24,2.24,0,0,0,62,10Zm-1.7,40.61-2.47-5h4.94ZM63,16.78H57.48V12.42A1.27,1.27,0,0,1,58.55,11H62A1.27,1.27,0,0,1,63,12.42Z"/><path d="M17.05,22h14.8a.49.49,0,0,0,.5-.49A7.91,7.91,0,0,0,26.73,14a4.33,4.33,0,0,0,2.1-3.72A4.38,4.38,0,1,0,22.17,14a7.91,7.91,0,0,0-5.61,7.56A.49.49,0,0,0,17.05,22Z"/><path d="M46.87,6.66H36.4a.5.5,0,0,0,0,1H46.87a.5.5,0,1,0,0-1Z"/><path d="M46.87,11.46H36.4a.5.5,0,0,0,0,1H46.87a.5.5,0,1,0,0-1Z"/><path d="M46.87,16.26H36.4a.49.49,0,0,0,0,1H46.87a.49.49,0,1,0,0-1Z"/><path d="M46.87,21.06H36.4a.49.49,0,0,0,0,1H46.87a.49.49,0,1,0,0-1Z"/><path d="M46.87,25.86H16.35a.49.49,0,0,0,0,1H46.87a.49.49,0,1,0,0-1Z"/><path d="M46.87,30.65H16.35a.5.5,0,0,0-.49.5.49.49,0,0,0,.49.49H46.87a.49.49,0,0,0,.5-.49A.5.5,0,0,0,46.87,30.65Z"/><path d="M46.87,35.45H16.35a.5.5,0,0,0,0,1H46.87a.5.5,0,1,0,0-1Z"/><path d="M46.87,40.25H16.35a.5.5,0,0,0,0,1H46.87a.5.5,0,1,0,0-1Z"/><path d="M46.87,45.05H16.35a.49.49,0,0,0,0,1H46.87a.49.49,0,1,0,0-1Z"/><path d="M46.87,49.85H16.35a.49.49,0,1,0,0,1H46.87a.49.49,0,1,0,0-1Z"/><path d="M50.73,36.9a.5.5,0,0,0-.5.5V47.74a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V37.4A.51.51,0,0,0,50.73,36.9Z"/></svg>
            </div>
            <div className="headings">
                <Link to={isLoaded(auth)&&!isEmpty(auth)? "/gettingStarted" : "/"}>Resume Templates</Link>
                <Link to="/about">About Us</Link>
                {(isLoaded(auth)&&!isEmpty(auth))?
                <div className="logesin">
                    <Link to="/">Logged in as {auth.email}</Link>
                    <button onClick={handleSignout}>Signout</button>
                </div>
                 :
                <div className="logesout">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
                }
            </div>
        </div>
    );
}

const mpstp = (state) => {
    return {
        auth: state.firebase.auth,
        authMine:state.auth
    }
}

const mpdtp = (dispatch) => {
    return {
        signout : () => {dispatch(SignOut())}
    }
}

const SignOut = () => {
    return (dispatch, getState, {getFirebase}) => {
    console.log("Signing Out");
    const firebase = getFirebase();
    firebase.auth().signOut()
        .then(()=>{dispatch({type:"Sign-Out"});
        console.log("Signout Success");
    })
        .catch((err) => {dispatch({type:"Sign-Out-Failed", error:err})})
    }
}

export default connect(mpstp, mpdtp)(Heading);