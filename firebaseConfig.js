// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYEol3wDIUihPTLaM1EjqVkpvjvJ-1_O4",
  authDomain: "my-website-backend-957db.firebaseapp.com",
  projectId: "my-website-backend-957db",
  storageBucket: "my-website-backend-957db.appspot.com",
  messagingSenderId: "75667291929",
  appId: "1:75667291929:web:10878882c9c30574144f88",
  measurementId: "G-8H93W7QZGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other modules
export { app, auth, db };
