import Rebase from 're-base';
import firebase from 'firebase';
  // Your web app's Firebase configuration
  
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
/*
const firebaseConfig = {
    apiKey: "AIzaSyCPV2Zv7nyq-5xQ5BzxE6o5dQyzIptrpu8",
    authDomain: "art-project-c8e48.firebaseapp.com",
    databaseURL: "https://art-project-c8e48.firebaseio.com",
    projectId: "art-project-c8e48",
    storageBucket: "art-project-c8e48.appspot.com",
    messagingSenderId: "1008438878371",
    appId: "1:1008438878371:web:85f7aff916771836511f16",
    measurementId: "G-RBHNDNZ8H5"
  };*/
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const base = Rebase.createClass(app.database());

  export { base }