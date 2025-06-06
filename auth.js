

import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// SIGN UP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! Redirecting to homepage...");
      window.location.href = "index.html";
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful! Redirecting to homepage...");
      window.location.href = "index.html";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });
}
