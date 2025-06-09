// ✅ Firebase SDK Setup
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// 🔐 Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYEol3wDIUihPTLaM1EjqVkpvjvJ-1_O4",
  authDomain: "my-website-backend-957db.firebaseapp.com",
  projectId: "my-website-backend-957db",
  storageBucket: "my-website-backend-957db.appspot.com",
  messagingSenderId: "75667291929",
  appId: "1:75667291929:web:10878882c9c30574144f88",
  measurementId: "G-8H93W7QZGT"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// ✅ Export for global use
export { auth, db };
