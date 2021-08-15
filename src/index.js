import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore ,createFirestoreInstance} from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import {BrowserRouter as Router} from 'react-router-dom';
import rootReducer from "./reducers/rootReducer";

let firebaseConfig = {
  apiKey: "AIzaSyC1abvcW5tQ4-JyqUfPDaYv3EzrDi_p-ow",
  authDomain: "resume-builder-d770d.firebaseapp.com",
  projectId: "resume-builder-d770d",
  storageBucket: "resume-builder-d770d.appspot.com",
  messagingSenderId: "696938910917",
  appId: "1:696938910917:web:766f0471af40e8b63b4cac"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();



let store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
  reduxFirestore(firebase))
);


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
  <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}>
      <App />
    </ReactReduxFirebaseProvider>
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
