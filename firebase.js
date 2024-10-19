 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv_iNxCA4-ni77rD3BQzirIQR_RnKfVx8",
  authDomain: "trovemart-b9547.firebaseapp.com",
  projectId: "trovemart-b9547",
  storageBucket: "trovemart-b9547.appspot.com",
  messagingSenderId: "1087087098811",
  appId: "1:1087087098811:web:0a09e26d3ad54a0c32229e",
  measurementId: "G-QNZT4BGYVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);