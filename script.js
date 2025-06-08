// 🌐 DOM Elements
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const menu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close-btn");

// 📱 Hamburger Menu Logic
hamburger?.addEventListener("click", () => {
  menu?.classList.add("show");
});
closeBtn?.addEventListener("click", () => {
  menu?.classList.remove("show");
});
window.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu?.classList.remove("show");
  }
});

// 🎥 Slideshow Logic
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i]?.classList.remove("active");
  });
  slides[index]?.classList.add("active");
  dots[index]?.classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Auto slideshow every 5 seconds
setInterval(nextSlide, 5000);

// Manual dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// 🎯 Initial Slide
showSlide(currentSlide);
