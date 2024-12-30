// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ec9ae.firebaseapp.com",
  projectId: "mern-estate-ec9ae",
  storageBucket: "mern-estate-ec9ae.appspot.com",
  messagingSenderId: "805698066230",
  appId: "1:805698066230:web:791ea29f21090f57ce4597"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);