// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_KEY)
console.log(import.meta.env.VITE_FIREBASE_DOMAIN)
console.log(import.meta.env.VITE_PROJECT_ID)
console.log(import.meta.env.VITE_STORAGE_BACKET)
console.log(import.meta.env.VITE_MESSING_SENDING_ID)
console.log(import.meta.env.VITE_APP_ID)
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BACKET,
  messagingSenderId: import.meta.env.VITE_MESSING_SENDING_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);