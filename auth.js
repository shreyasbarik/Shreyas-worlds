import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// 🔄 Redirect if user is already logged in
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("login")) {
    window.location.href = "index.html";
  }
});

// ✅ SIGNUP FUNCTION
const signupForm = document.querySelector("#signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("✅ Signup successful!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        document.querySelector("#signup-error").textContent = error.message;
      });
  });
}

// ✅ LOGIN FUNCTION
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("✅ Login successful!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        document.querySelector("#login-error").textContent = error.message;
      });
  });
}

// ✅ LOGOUT FUNCTION
const logoutBtn = document.querySelector("#logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("👋 Logged out!");
        window.location.href = "login.html";
      })
      .catch((error) => {
        alert("Logout Error: " + error.message);
      });
  });
}
