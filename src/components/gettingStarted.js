import React from "react";
import { skinCodes } from "../constants/typeCode";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { useLocatio } from "react-router-dom";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";

import './gettingStarted.css';
import skin1 from './skin1.svg';
import skin2 from './skin2.svg';
import skin3 from './skin3.svg';
import skin4 from './skin4.svg';
import skin5 from './skin5.svg';
import skin6 from './skin6.svg';
import skin7 from './skin7.svg';
import skin8 from './skin8.svg';
const {v4:uuidv4} = require("uuid");


const GettingStarted = (props) => {
    let history = useHistory();
    const templates = {
        'skin1':skin1,
        'skin2':skin2,
        'skin3':skin3,
        'skin4':skin4,
        'skin5':skin5,
        'skin6':skin6,
        'skin7':skin7,
        'skin8':skin8
    }
    const onsubmit = async(value)=>{
        console.log(typeof value);
        let document = {
            id:uuidv4(),
            skinCd:value
        }
        props.updateSkin(document);
        history.push('/contact');
    }
    return ( 
        <div className="resume-templates">
            <h1>Select a resume template to get started</h1>
            <p className="center">
                You'll be able to edit and change this template later!
            </p>
            <div className="styleTemplate">
                {
                    skinCodes.map((value, index)=>{
                        console.log(value);
                        return(
                            <div key={index} className="template-card rounded-border">
                                <i className={(value == props.skinCd? 'selected fa fa-check' :'hide') } ></i>
                                <img src={(templates[value])}/>
                                <button onClick={()=>onsubmit(value)}>Use Template</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
     );
}

function mapStateToProps(store){
    return store.document;
}

function mapDispatchToProps(dispatch){
    return {
        updateSkin : (document)=>{dispatch({type:"Update-Skin", payload:document})}
    };
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GettingStarted));