// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL0xPKlfh_I1eKWMskbtIJoYxEJQejmMk",
  authDomain: "car-parts-b9011.firebaseapp.com",
  projectId: "car-parts-b9011",
  storageBucket: "car-parts-b9011.appspot.com",
  messagingSenderId: "881136643365",
  appId: "1:881136643365:web:7fc873da2ca3928d793ecc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
