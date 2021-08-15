import { fieldCd } from "../constants/typeCode";
import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import { connect } from "react-redux";
import "./contact.css";
import ResumePreview from "./resumePreview";

const Contact = (props) => {
    let history = useHistory();
    const [contact, setContact] = useState(props);
    const onsubmit1 = ()=>{
        props.updateContact(contact);
        history.push("/gettingStarted");
    }

    const onsubmit2 = () => {
        props.updateContact(contact);
        history.push("/education");
    }

    const onchange = (e)=>{
        // console.log(e);
        let newContact = {...contact, [e.target.name]:e.target.value}
        setContact(newContact);
    }
    return (
        <div className="contact-content">
            <div className="section-1">
                <h1>Personal Details</h1>
                <div className="full-name">
                    <div className="first-name">
                        <h5>First Name</h5>
                        <input type="text" name={fieldCd.FirstName}onChange={onchange} value={contact[fieldCd.FirstName]}/>
                    </div>
                    <div className="last-name">
                        <h5>Last Name</h5>
                        <input type="text" name={fieldCd.LastName}onChange={onchange} value={contact[fieldCd.LastName]}/>
                    </div>
                </div>
                <div className="professional-summary">
                    <div className="professional-content">
                        <h5>Professional Summary</h5>
                        <input type="text" name={fieldCd.ProfSummary}onChange={onchange} value={contact[fieldCd.ProfSummary]}/>
                    </div>
                    
                </div>
                <div className="email-phone">
                    <div className="email">
                        <h5>Email</h5>
                        <input type="text" name={fieldCd.Email}onChange={onchange} value={contact[fieldCd.Email]}/>
                    </div>
                    <div className="phone">
                        <h5>Phone</h5>
                        <input type="text" name={fieldCd.Phone}onChange={onchange} value={contact[fieldCd.Phone]}/>
                    </div>
                </div>
                <div className="profession-street">
                    <div className="profession">
                        <h5>Profession</h5>
                        <input type="text" name={fieldCd.Profession}onChange={onchange} value={contact[fieldCd.Profession]}/>
                    </div>
                    <div className="street">
                        <h5>Street</h5>
                        <input type="text" name={fieldCd.Street}onChange={onchange} value={contact[fieldCd.Street]}/>
                    </div>
                </div>
                <div className="city-state">
                    <div className="city">
                        <h5>City</h5>
                        <input type="text" name={fieldCd.City}onChange={onchange} value={contact[fieldCd.City]}/>
                    </div>
                    <div className="state">
                        <h5>State</h5>
                        <input type="text" name={fieldCd.State}onChange={onchange} value={contact[fieldCd.State]}/>
                    </div>
                </div>
                <div className="country-pincode">
                    <div className="country">
                        <h5>Country</h5>
                        <input type="text" name={fieldCd.Country}onChange={onchange} value={contact[fieldCd.Country]}/>
                    </div>
                    <div className="pincode">
                        <h5>Pin Code</h5>
                        <input type="text" name={fieldCd.ZipCode}onChange={onchange} value={contact[fieldCd.ZipCode]}/>
                    </div>
                </div>
                <button type="button" onClick={()=>{onsubmit1(contact)}}>Prev</button>
                <button type="button" onClick={()=>{onsubmit2(contact)}}>Next</button>
            </div>
            <div className="section-2">
            <ResumePreview contactSection={contact}></ResumePreview>
            </div>
        </div>
    );
}

const mpstp = (state) => {
    return state.contact;
}

const mpdtp = (dispatch) => {
    return  {
        updateContact : (contact) => {dispatch({type:"Update-Contact", payload:contact})}
    };
}
 
export default connect(mpstp, mpdtp)(Contact);