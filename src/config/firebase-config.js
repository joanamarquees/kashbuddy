// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbsQt-_FlVo9OGBIonHrk0ij0U55IRTy8",
  authDomain: "kashbuddy-4aeb1.firebaseapp.com",
  projectId: "kashbuddy-4aeb1",
  storageBucket: "kashbuddy-4aeb1.appspot.com",
  messagingSenderId: "221935808539",
  appId: "1:221935808539:web:b1e397adb2b599102888be",
  measurementId: "G-8JJH5VV6NM"
}; // TODO: create environment variables for this for github


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// commands needed
// firebase login
// firebase init
// firebase deploy