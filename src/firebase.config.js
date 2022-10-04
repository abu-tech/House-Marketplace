import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8jSpJZqciZP_Qb-MIMJGV4p8IvBk2Tjs",
  authDomain: "house-marketplace-app-b39f2.firebaseapp.com",
  projectId: "house-marketplace-app-b39f2",
  storageBucket: "house-marketplace-app-b39f2.appspot.com",
  messagingSenderId: "310389876465",
  appId: "1:310389876465:web:886753d67171fe0af72b50",
  measurementId: "G-L3DBRT7FRW"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();