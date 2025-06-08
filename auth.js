// Import Firebase Auth functions
import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');

// Redirect logged-in users to homepage (or dashboard)
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = 'index.html'; // Redirect after login/signup success
  }
});

// Login form submit handler
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    const email = loginForm['login-email'].value.trim();
    const password = loginForm['login-password'].value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On success, redirect handled by onAuthStateChanged
    } catch (error) {
      loginError.textContent = getErrorMessage(error.code);
    }
  });
}

// Signup form submit handler
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    signupError.textContent = '';
    const email = signupForm['signup-email'].value.trim();
    const password = signupForm['signup-password'].value.trim();

    if (password.length < 6) {
      signupError.textContent = 'Password should be at least 6 characters.';
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // On success, redirect handled by onAuthStateChanged
    } catch (error) {
      signupError.textContent = getErrorMessage(error.code);
    }
  });
}

// Friendly error messages
function getErrorMessage(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/user-disabled':
      return 'User account disabled.';
    case 'auth/user-not-found':
      return 'User not found.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'Email already in use.';
    case 'auth/weak-password':
      return 'Weak password.';
    default:
      return 'Authentication error. Please try again.';
  }
}
