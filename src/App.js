import './App.css';
import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';


const landingPage =  lazy(() => import('./components/landingPage'));
const GettingStarted = lazy(() => import('./components/gettingStarted'));
const Contact = lazy(() => import('./components/contact'));
const Education = lazy(() => import('./components/education'));
const Finalize = lazy(() => import('./components/finalize'));
const Heading = lazy(() => import('./components/heading'));
const LoginPage = lazy(() => import('./components/loginPage'));
const AboutUs = lazy(() => import('./components/aboutUs'));
const RegisterPage = lazy(() => import('./components/RegisterPage'));




function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
    {/* <Router> */}
      <Heading></Heading>
      <Switch>
        <Route path="/" component={landingPage} exact></Route>
        <PrivateRoute path="/gettingStarted" component={GettingStarted} exact></PrivateRoute>
        <PrivateRoute path="/contact" component={Contact} exact></PrivateRoute>
        <PrivateRoute path="/education" component={Education} exact></PrivateRoute>
        <PrivateRoute path="/finalize" component={Finalize} exact></PrivateRoute>
        <Route path="/login" component={LoginPage} exact></Route>
        <Route path="/register" component={RegisterPage}></Route>
        <Route path="/about" component={AboutUs} exact></Route>
      </Switch>
    {/* </Router> */}
    </Suspense>
  );
}

export default App;
