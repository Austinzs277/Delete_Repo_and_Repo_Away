import logo from './logo.svg';
// This uses the pre-built login form
import { StyledFirebaseAuth } from 'react-firebaseui';
// This imports firebase using the Firebase SDK v8 style
import firebase from 'firebase/compat/app'
// This imports the Firebase Auth libraries
import 'firebase/compat/auth'
import './App.css';
import { useState, useEffect } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkcjeYtzVvvI2JUIjhrJ51Cs27P6-2qNQ",
  authDomain: "milestone3-c374d.firebaseapp.com",
  projectId: "milestone3-c374d",
  storageBucket: "milestone3-c374d.appspot.com",
  messagingSenderId: "759498114377",
  appId: "1:759498114377:web:504ddd4d38864125ef0698",
  measurementId: "G-S21F5C6KKD"
};
firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function App() {

  // State to keep track of signed-in state
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleClick = () => {
    firebase.auth().signOut().then(() => {
      setIsSignedIn(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      // this gets called whenever a user signs in or out
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if(!isSignedIn) {
    return (
      <div>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome - You are now signed-in - {isSignedIn}!</p>
      <button onClick={handleClick}>
        LogOut
      </button>
    </div>
  );
}

export default App;
