// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
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