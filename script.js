// =============== VIDEO SLIDESHOW LOGIC ===============
const videos = document.querySelectorAll('.hero-slider video');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let slideInterval;

function showSlide(index) {
  videos.forEach((vid, i) => {
    vid.classList.toggle('hidden', i !== index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentIndex = index;
}

function nextSlide() {
  let next = (currentIndex + 1) % videos.length;
  showSlide(next);
}

function startSlideShow() {
  slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stopSlideShow();
    showSlide(i);
    startSlideShow();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  startSlideShow();
});


// =============== MOBILE MENU LOGIC ===============
const mobileMenu = document.querySelector('.mobile-menu');
const openBtn = document.querySelector('.mobile-only');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !openBtn.contains(e.target)
  ) {
    mobileMenu.classList.remove('open');
  }
});
