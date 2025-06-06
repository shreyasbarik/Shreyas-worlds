// auth-login.js
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();
  const errorMsg = document.getElementById('error-msg');

  try {
    await signInWithEmailAndPassword(auth, email, password);
    errorMsg.style.color = "limegreen";
    errorMsg.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "index.html"; // Redirect to homepage
    }, 1500);
  } catch (error) {
    errorMsg.style.color = "#ff4d4d";
    errorMsg.textContent = error.message;
  }
});
