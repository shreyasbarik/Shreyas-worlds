

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("open");
});

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Auto-playing video slider
let slideIndex = 0;
const slides = document.querySelectorAll(".hero-slider video");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
    slide.pause();
  });
  slides[index].play();
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

if (slides.length > 0) {
  showSlide(slideIndex);
  setInterval(nextSlide, 5000);
}

// Optional scroll-based parallax or animations (GSAP, Locomotive Scroll) can go here
