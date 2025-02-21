// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;

// VITE_apiKey=AIzaSyAUiKS6_QWsDNktTL9cuO6Xx1GTHf5NukY
// VITE_authDomain=restaurant-management-b98e1.firebaseapp.com
// VITE_projectId=restaurant-management-b98e1
// VITE_storageBucket=restaurant-management-b98e1.firebasestorage.app
// VITE_messagingSenderId=638741927453
// VITE_appId=1:638741927453:web:37016822b88c577a5958f4