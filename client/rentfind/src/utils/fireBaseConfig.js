// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDb-K2zSMmt5FuCQdCf7DA3sc0dhOLrkUo",
    authDomain: "rentfind-1bc87.firebaseapp.com",
    projectId: "rentfind-1bc87",
    storageBucket: "rentfind-1bc87.appspot.com",
    messagingSenderId: "994479302377",
    appId: "1:994479302377:web:ad72a93a30227dcc50b278",
    measurementId: "G-ZVK9P36DYL",
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };
