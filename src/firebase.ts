// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvJwliVapokxsgAjQpQEUrm_9SeICmDqM",
  authDomain: "expense-tracker-app-devversion.firebaseapp.com",
  projectId: "expense-tracker-app-devversion",
  storageBucket: "expense-tracker-app-devversion.appspot.com",
  messagingSenderId: "576995008754",
  appId: "1:576995008754:web:9c7aa6fc94edc31853b06b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)

