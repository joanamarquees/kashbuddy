import React, { Component } from 'react';

import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';

import 'firebase/auth'; // needed??

import { useCollection} from 'react-firebase-hooks/firestore';

firebase.initializeApp ({
  apiKey: "AIzaSyBbsQt-_FlVo9OGBIonHrk0ij0U55IRTy8",
  authDomain: "kashbuddy-4aeb1.firebaseapp.com",
  projectId: "kashbuddy-4aeb1",
  storageBucket: "kashbuddy-4aeb1.appspot.com",
  messagingSenderId: "221935808539",
  appId: "1:221935808539:web:b1e397adb2b599102888be",
  measurementId: "G-8JJH5VV6NM"
})

const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}


export default App;
