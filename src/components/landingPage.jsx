import { Link } from "react-router-dom";
import './landingPage.css';
import aboutUs from './template5.jpg';

const landingPage = () => {
    return (
        <div className="lp">
            <div className="content">
                <h1>Make a Job-Winning Resume in Minutes With Our Simple Resume Builder</h1>
                <ul>
                    <li><i></i>Customizable, HR-approved, ready-to-use resume templates</li>
                    <li><i></i>Step-by-step guidance and expert tips to create a targeted, job-scoring resume</li>
                    <li><i></i>Free industry-specific, pre-written examples you can add with the click of a button</li>
                </ul>
                <Link to="/gettingStarted"><button>Build Resume</button></Link>
            </div>
            <div className="demo-image">
                <img src={aboutUs} alt="" />
            </div>
        </div>
    );
}
 
export default landingPage;