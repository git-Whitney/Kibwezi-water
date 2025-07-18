// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA41cVxVDabzu_yBEr01_dx4CtMlw3ldAk",
  authDomain: "kibwezi-water.firebaseapp.com",
  projectId: "kibwezi-water",
  storageBucket: "kibwezi-water.appspot.com",
  messagingSenderId: "352672864079",
  appId: "1:352672864079:web:923583da9d31cc2862973a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);