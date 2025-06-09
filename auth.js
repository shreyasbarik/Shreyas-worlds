// auth.js

import { auth } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';

// Signup function
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log('User signed up:', cred.user);
        signupForm.reset();
        window.location.href = 'index.html';
      })
      .catch(err => {
        alert(err.message);
      });
  });
}

// Login function
const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log('User logged in:', cred.user);
        loginForm.reset();
        window.location.href = 'index.html';
      })
      .catch(err => {
        alert(err.message);
      });
  });
}

// Logout function
const logoutBtn = document.querySelector('#logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      window.location.href = 'index.html';
    });
  });
}

// Auth state listener (optional)
onAuthStateChanged(auth, user => {
  if (user) {
    console.log('User is logged in:', user);
  } else {
    console.log('User is logged out');
  }
});
