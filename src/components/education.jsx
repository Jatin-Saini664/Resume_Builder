import { connect } from 'react-redux';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { fieldCd } from '../constants/typeCode';
import './education.css';
import ResumePreview from './resumePreview';

const Education = (props) => {
    let history = useHistory();
    const [educationContent, setContent] = useState(props.education);
    const contact = props.contact;
    const onsubmit1 = () => {
        props.setEducationContent(educationContent);
        history.push("/finalize");
    }

    const onsubmit2 = () => {
        props.setEducationContent(educationContent);
        history.push("/finalize");
    }

    const onchange = (e) => {
        let newContent = {...educationContent, [e.target.name]:e.target.value};
        setContent(newContent);
    }
    return ( 
        <div className="education-section">
            <div className="section-1">
                <h1>Education Details</h1>
                <div className="college-degree">
                    <div className="college-name">
                        <h5>College Name</h5>
                        <input type="text" name = {fieldCd.CollegeName}onChange = {onchange} value={educationContent[fieldCd.CollegeName]}/>
                    </div>
                    <div className="degree">
                        <h5>Degree</h5>
                        <input type="text" name = {fieldCd.Degree}onChange = {onchange} value={educationContent[fieldCd.Degree]}/>
                    </div>
                </div>
                <div className="cgpa-city">
                    <div className="cgpa">
                        <h5>CGPA</h5>
                        <input type="text" name = {fieldCd.GraduationCGPA}onChange = {onchange} value={educationContent[fieldCd.GraduationCGPA]}/>
                    </div>
                    <div className="city-state">
                        <h5>City/State</h5>
                        <input type="text" name = {fieldCd.City}onChange = {onchange} value={educationContent[fieldCd.City]}/>
                    </div>
                </div>
                <div className="grad-month-year">
                    <div className="grad-month">
                        <h5>Graduation Month</h5>
                        <input type="text" name = {fieldCd.GraduationDate}onChange = {onchange} value={educationContent[fieldCd.GraduationDate]}/>
                    </div>
                    <div className="grad-year">
                        <h5>Graduation Year</h5>
                        <input type="text" name = {fieldCd.GraduationYear}onChange = {onchange} value={educationContent[fieldCd.GraduationYear]}/>
                    </div>
                </div>
                <button onClick={()=>onsubmit1()}>Prev</button>
                <button onClick={()=>onsubmit2()}>Next</button>
            </div>
            <div className="section-2">
                <ResumePreview contactSection={contact} educationSection={educationContent}></ResumePreview>
            </div>
        </div>
     );
}

const mpstp = (state) => {
    return {
        education:state.educationContent,
        contact:state.contact
    }
}

const mpdtp = (dispatch) => {
    return {
        setEducationContent : (educationContent) => {dispatch({type:"Set-Education-Content", payload:educationContent})}
    };
}
 
export default connect(mpstp, mpdtp)(Education);