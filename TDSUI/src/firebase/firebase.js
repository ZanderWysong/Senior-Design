// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD49VEMiBDfUHW2-3_sjscfr00H5MN2LM",
  authDomain: "tdsui-54f4a.firebaseapp.com",
  databaseURL: "https://tdsui-54f4a-default-rtdb.firebaseio.com",
  projectId: "tdsui-54f4a",
  storageBucket: "tdsui-54f4a.firebasestorage.app",
  messagingSenderId: "337032365489",
  appId: "1:337032365489:web:e7a8dad2e99e3e6675a990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }