// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCrz6TW6Rg6Kh2ukNwEL0CHDEo7fTPbvvw",
  authDomain: "azota-v1.firebaseapp.com",
  projectId: "azota-v1",
  storageBucket: "azota-v1.appspot.com",
  messagingSenderId: "269942965810",
  appId: "1:269942965810:web:7c90e882f8cc784478de2b",
  measurementId: "G-7RBH7Z6XHS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
