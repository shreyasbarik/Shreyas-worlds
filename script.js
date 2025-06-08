// ✅ Mobile Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('show');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('show');
});

window.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('show');
  }
});

// ✅ Parallax Slideshow Logic
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active-dot');
    if (i === index) {
      slide.classList.add('active');
      dots[i].classList.add('active-dot');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto Slide every 5 seconds
setInterval(nextSlide, 5000);

// Dot click handler
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Optional: GSAP Scroll Reveal (expandable)
if (typeof gsap !== 'undefined') {
  gsap.from(".footer", {
    scrollTrigger: ".footer",
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
}
