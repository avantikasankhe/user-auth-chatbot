// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOA3zOdCWM3TY_Mrz94hmk2m7k_gsePU0",
  authDomain: "user-auth-8d1d9.firebaseapp.com",
  projectId: "user-auth-8d1d9",
  storageBucket: "user-auth-8d1d9.appspot.com",
  messagingSenderId: "1051162499084",
  appId: "1:1051162499084:web:6d2a103ed81c59e167f629"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);