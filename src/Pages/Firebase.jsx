
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCYCJ1AXmg14jhuVZgQSlmnmGoaLPPW18U",
    authDomain: "blood-bank-eaeca.firebaseapp.com",
    projectId: "blood-bank-eaeca",
    storageBucket: "blood-bank-eaeca.firebasestorage.app",
    messagingSenderId: "632627193724",
    appId: "1:632627193724:web:bb5d0ccd63901223b9a6f9",
    measurementId: "G-FBEQJZ338T"
  };
  
 // Initialize Firebase
const App =initializeApp(firebaseConfig);
const auth = getAuth(App);
const db = getFirestore(App);
export {auth,db}