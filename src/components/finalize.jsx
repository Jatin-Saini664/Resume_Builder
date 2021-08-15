import React from 'react';
import { connect } from 'react-redux';
import {useFirestore} from "react-redux-firebase";
import { bindActionCreators } from 'redux';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ResumePreview from './resumePreview';


const Finalize = (props) => {
    const firestore = useFirestore();
    let educationSection= props.educationSection;
    let contactSection=props.contactSection;
    let documentd=props.document;
    const downloadResume = () => {
        const input = document.getElementById('resumePreview');
        console.log(document)
         html2canvas(input)
           .then((canvas) => {
             const imgData = canvas.toDataURL('image/png');
             const pdf = new jsPDF("p", "mm", "a4");
             const width = pdf.internal.pageSize.getWidth();
             const height = pdf.internal.pageSize.getHeight();
             pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
             // pdf.output('dataurlnewwindow');
             pdf.save("resume.pdf");
           }).catch(function(error){
             console.log(error)
           })
    }

    const saveResume = async () => {
        console.log(props.auth.uid)
      let user = await firestore.collection('users').doc(props.auth.uid).get();
      user = user.data();
      console.log(user);
      let newObj=  null;
      if(user.resumeIds!=undefined){
       newObj = {...user.resumeIds,[documentd.id]:{educationSection:educationSection,contactSection:contactSection,document:documentd}}
      }else{
       newObj = {[documentd.id]:{educationSection:educationSection,contactSection:contactSection,document:documentd}}
      }
      console.log(newObj);
      await firestore.collection('users').doc(props.auth.uid).update({
        resumeIds:newObj
      })
    }
    return (
        <div className="finalize-container">
            <div className="finalize-preview" id="resumePreview">
            <ResumePreview contactSection={contactSection} educationSection={educationSection}></ResumePreview>
            </div>
            <div className="finalize-content">
                <div className="download-resume">
                    <h3>Download resume as PDF</h3>
                    <a style={{cursor:"pointer"}} onClick={downloadResume}>Download Resume</a>
                </div>
                <div className="save-resume">
                    <h3>Save To Database</h3>
                    <a style={{cursor:"pointer"}} onClick={saveResume}>Save Resume</a>
                </div>
            </div>
        </div>
    );
}

const mpstp = (state) => {
    return {
      contactSection:state.contact,
      educationSection:state.educationContent,
      document:state.document,
      auth: state.firebase.auth,
    }
}

// const mpdtp = (dispatch) => {
//     return {
//         documentActions:bindActionCreators(documentActions, dispatch)
//     }
// }

 
export default connect(mpstp)(Finalize);