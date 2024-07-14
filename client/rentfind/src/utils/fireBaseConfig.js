// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDa93XwlbD8wFP4l0MXdyrdsAVDpilhlK8",
    authDomain: "sent-mail-rent-find.firebaseapp.com",
    projectId: "sent-mail-rent-find",
    storageBucket: "sent-mail-rent-find.appspot.com",
    messagingSenderId: "254019678992",
    appId: "1:254019678992:web:892e14569087356a05ab95",
    measurementId: "G-QF6ML4FQHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { firebase };
