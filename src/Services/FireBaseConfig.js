// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqHnacUPxU7wJfTrYPdbTQPhTyFlmNgkM",
  authDomain: "aplicativo-53c76.firebaseapp.com",
  projectId: "aplicativo-53c76",
  storageBucket: "aplicativo-53c76.appspot.com",
  messagingSenderId: "750144295945",
  appId: "1:750144295945:web:5f2257af289c0bf8b7d4d8",
  measurementId: "G-MCZCH1VGY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });