// This uses the pre-built login form
import { StyledFirebaseAuth } from 'react-firebaseui';
// This imports firebase using the Firebase SDK v8 style
import firebase from 'firebase/compat/app'
// This imports the Firebase Auth libraries
import 'firebase/compat/auth'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
  // to execute the callbacks
  signInSuccessUrl: undefined, 
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (authResult) => {
      const userEmail = authResult.user.email; // get user's login email
      const expirationDate = new Date(Date.now() + 86400000); // 24 hours from now
      document.cookie = `user_email=${userEmail}; expires=${expirationDate.toUTCString()}`;
      fetch("/checkUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        /** TODO: Replace here with user's email  */
        body: JSON.stringify({"username": userEmail}),
        })
        .then(response =>{
            if (response.ok) {
                console.log(response);
                return response.json();
            } else{
            /** TODO: Implement the 404 and catch the error  */
            throw new Error("Reponse is not OK");
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error)
        });
      // prevent redirection
      return false
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function LoginPage() {

  // State to keep track of signed-in state
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    firebase.auth().signOut().then(() => {
      setIsSignedIn(false);
      // delete the cookie by setting it expired
      document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      // Navigate to the dashboard page without user info after logged out
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleHomePage = () => {
    // Navigate to the dashboard page with a success message
    navigate('/', {  state: 'LoginSuccessfully' });
  }

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      // this gets called whenever a user signs in or out
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const classes = useStyles();

  if(!isSignedIn) {
    return (
      <div className={classes.root} style={{ textAlign: 'center' }}>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div className={classes.root} style={{ textAlign: 'center' }}>
      <h1>CalCalories User's Dashboard</h1>
      <p>Welcome, You are now signed-in!</p>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        I really want to LogOut
      </Button>
      <Button variant="outlined" color="primary" onClick={handleHomePage}>
        Go to HomePage
      </Button>
    </div>
  );
}

export default LoginPage;
