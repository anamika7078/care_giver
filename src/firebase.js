// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpL-X1dytjmITYfxMUUhd40OJF1vhb98o",
    authDomain: "familycaregive-25296.firebaseapp.com",
    projectId: "familycaregive-25296",
    storageBucket: "familycaregive-25296.firebasestorage.app",
    messagingSenderId: "460730784364",
    appId: "1:460730784364:web:cb4e4558daa578a131d649",
    measurementId: "G-P4VLZ8FMRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);