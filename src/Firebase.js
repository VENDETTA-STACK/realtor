// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3rJqs95zw_50nP8uAJGdPH7hWOaU9rdo",
  authDomain: "thechintanrealtor.firebaseapp.com",
  projectId: "thechintanrealtor",
  storageBucket: "thechintanrealtor.appspot.com",
  messagingSenderId: "1021819929777",
  appId: "1:1021819929777:web:a48f50c5929ee933558e90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);