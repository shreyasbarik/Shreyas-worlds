document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenuBtn = document.querySelector('.close-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');

  // Toggle mobile menu open
  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  // Close mobile menu
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  // Hamburger click
  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button click
  closeMenuBtn.addEventListener('click', closeMenu);

  // Click outside menu closes it
  overlay.addEventListener('click', closeMenu);

  // Hero Slideshow Setup
  const slides = document.querySelectorAll('.slides-container video');
  const dots = document.querySelectorAll('.dots-container .dot');
  let currentSlide = 0;
  const slideCount = slides.length;
  let slideTimeout;

  function showSlide(index) {
    if (index === currentSlide) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    dots[currentSlide].setAttribute('aria-selected', 'false');
    dots[currentSlide].setAttribute('tabindex', '-1');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    dots[currentSlide].setAttribute('aria-selected', 'true');
    dots[currentSlide].setAttribute('tabindex', '0');
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slideCount;
    showSlide(nextIndex);
  }

  // Auto slide every 5s
  function startSlideshow() {
    slideTimeout = setInterval(nextSlide, 5000);
  }

  function stopSlideshow() {
    clearInterval(slideTimeout);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      stopSlideshow();
      showSlide(idx);
      startSlideshow();
    });
    dot.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        stopSlideshow();
        showSlide(idx);
        startSlideshow();
      }
    });
  });

  startSlideshow();

  // GSAP or Locomotive Scroll initialization can be added here later
});
import { signup, login } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  // Elements references
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  // Password toggle for Login
  const toggleLoginPasswordBtn = document.getElementById('toggle-login-password');
  const loginPasswordInput = document.getElementById('login-password');

  // Password toggles for Signup
  const toggleSignupPasswordBtn = document.getElementById('toggle-signup-password');
  const signupPasswordInput = document.getElementById('signup-password');

  const toggleSignupConfirmBtn = document.getElementById('toggle-signup-confirm-password');
  const signupConfirmInput = document.getElementById('signup-confirm-password');

  function togglePasswordVisibility(input, button) {
    if (input.type === 'password') {
      input.type = 'text';
      button.textContent = '🙈';
    } else {
      input.type = 'password';
      button.textContent = '👁️';
    }
  }

  // Add password toggle handlers
  if (toggleLoginPasswordBtn && loginPasswordInput) {
    toggleLoginPasswordBtn.addEventListener('click', () => togglePasswordVisibility(loginPasswordInput, toggleLoginPasswordBtn));
  }
  if (toggleSignupPasswordBtn && signupPasswordInput) {
    toggleSignupPasswordBtn.addEventListener('click', () => togglePasswordVisibility(signupPasswordInput, toggleSignupPasswordBtn));
  }
  if (toggleSignupConfirmBtn && signupConfirmInput) {
    toggleSignupConfirmBtn.addEventListener('click', () => togglePasswordVisibility(signupConfirmInput, toggleSignupConfirmBtn));
  }

  // Validation helpers
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  function setError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
  }

  function clearErrors(formPrefix) {
    setError(`${formPrefix}-email-error`, '');
    setError(`${formPrefix}-password-error`, '');
    if (formPrefix === 'signup') {
      setError('signup-confirm-password-error', '');
    }
    setError(`${formPrefix}-firebase-error`, '');
  }

  // Disable button & show spinner
  function setLoading(button, spinner, loading) {
    if (loading) {
      button.disabled = true;
      button.classList.add('loading');
      spinner.style.display = 'inline-block';
    } else {
      button.disabled = false;
      button.classList.remove('loading');
      spinner.style.display = 'none';
    }
  }

  // LOGIN FORM SUBMIT
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors('login');

      const email = loginForm['email'].value.trim();
      const password = loginForm['password'].value.trim();
      const btn = document.getElementById('login-submit');
      const spinner = document.getElementById('login-spinner');

      // Validate email
      if (!email) {
        setError('login-email-error', 'Email is required.');
        return;
      } else if (!validateEmail(email)) {
        setError('login-email-error', 'Invalid email format.');
        return;
      }

      // Validate password
      if (!password) {
        setError('login-password-error', 'Password is required.');
        return;
      } else if (password.length < 6) {
        setError('login-password-error', 'Password must be at least 6 characters.');
        return;
      }

      setLoading(btn, spinner, true);
      try {
        await login(email, password);
        // Redirect or do something on success
        window.location.href = 'index.html'; // or dashboard
      } catch (err) {
        setError('login-firebase-error', err.message || 'Failed to login.');
      }
      setLoading(btn, spinner, false);
    });
  }

  // SIGNUP FORM SUBMIT
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors('signup');

      const email = signupForm['email'].value.trim();
      const password = signupForm['password'].value.trim();
      const confirmPassword = signupForm['confirm-password'].value.trim();

      const btn = document.getElementById('signup-submit');
      const spinner = document.getElementById('signup-spinner');

      // Validate email
      if (!email) {
        setError('signup-email-error', 'Email is required.');
        return;
      } else if (!validateEmail(email)) {
        setError('signup-email-error', 'Invalid email format.');
        return;
      }

      // Validate password
      if (!password) {
        setError('signup-password-error', 'Password is required.');
        return;
      } else if (password.length < 6) {
        setError('signup-password-error', 'Password must be at least 6 characters.');
        return;
      }

      // Validate confirm password
      if (!confirmPassword) {
        setError('signup-confirm-password-error', 'Please confirm password.');
        return;
      } else if (password !== confirmPassword) {
        setError('signup-confirm-password-error', 'Passwords do not match.');
        return;
      }

      setLoading(btn, spinner, true);
      try {
        await signup(email, password);
        // Redirect or do something on success
        window.location.href = 'index.html'; // or dashboard
      } catch (err) {
        setError('signup-firebase-error', err.message || 'Failed to sign up.');
      }
      setLoading(btn, spinner, false);
    });
  }
});
