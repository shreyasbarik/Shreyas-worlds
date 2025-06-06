document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const authButtons = document.querySelector('.auth-buttons');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    authButtons.classList.toggle('auth-active');
    hamburger.classList.toggle('open');
  });

  // Exam Free submenu toggle on mobile
  const examToggle = document.querySelector('.exam-toggle');
  if (examToggle) {
    examToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = examToggle.nextElementSibling;
      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
      } else {
        submenu.style.display = 'block';
      }
    });
  }

  // Slideshow logic
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const nextBtn = document.querySelector('.slide-btn.next');
  const prevBtn = document.querySelector('.slide-btn.prev');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Auto slideshow every 5 sec
  setInterval(nextSlide, 5000);

  // Dark mode toggle (optional, can add button in header)
  /*
  const darkModeToggle = document.querySelector('#darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }
  */
});
