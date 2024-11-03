// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtqbtWaT0i36b7tIr9va9joan7hn0bo9Q",
  authDomain: "shoppingapp-c5c9e.firebaseapp.com",
  projectId: "shoppingapp-c5c9e",
  storageBucket: "shoppingapp-c5c9e.firebasestorage.app",
  messagingSenderId: "963220523270",
  appId: "1:963220523270:web:2a3746d418470643317687",
  measurementId: "G-8TR6NC2RNT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;