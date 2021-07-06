import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import firebase from "firebase/app";


firebase.initializeApp({
  apiKey: "AIzaSyCiNVO-aUiVm9apjxaBuVbsFrW19VHRvN8",
  authDomain: "rezume-eedc0.firebaseapp.com",
  projectId: "rezume-eedc0",
  storageBucket: "rezume-eedc0.appspot.com",
  messagingSenderId: "907111840784",
  appId: "1:907111840784:web:de09dddc506b3982b41e95"
});

ReactDOM.render(
<App />,
document.getElementById('root') 
)