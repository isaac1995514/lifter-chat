// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe0UmAG7v4bvuvrk7C5oTzHO45IWveYCg",
  authDomain: "lifter-a55a3.firebaseapp.com",
  projectId: "lifter-a55a3",
  storageBucket: "lifter-a55a3.appspot.com",
  messagingSenderId: "49903903118",
  appId: "1:49903903118:web:3f6e8ec412430f71ad84df",
  measurementId: "G-7MWM6HMRRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
