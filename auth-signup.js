// auth-signup.js
import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

document.getElementById('signup-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();
  const errorMsg = document.getElementById('error-msg');

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    errorMsg.style.color = "limegreen";
    errorMsg.textContent = "Account created! Redirecting to login...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } catch (error) {
    errorMsg.style.color = "#ff4d4d";
    errorMsg.textContent = error.message;
  }
});
