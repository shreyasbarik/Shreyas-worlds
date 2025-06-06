// script.js – Handles slideshow, smooth scroll, GSAP animations

// ============================
// Video Slideshow Logic
// ============================
const videoPaths = [
  'Slide1.mp4', 'Slide2.mp4', 'Slide3.mp4', 'Slide4.mp4',
  'Slide5.mp4', 'Slide6.mp4', 'Slide7.mp4', 'Slide8.mp4', 'Slide9.mp4'
];

let currentIndex = 0;
const videoElement = document.querySelector('.video-background video');

function playNextVideo() {
  currentIndex = (currentIndex + 1) % videoPaths.length;
  videoElement.src = `Slide Show Design/${videoPaths[currentIndex]}`;
  videoElement.play();
}

videoElement.addEventListener('ended', playNextVideo);

// Start with first video
videoElement.src = `Slide Show Design/${videoPaths[0]}`;
videoElement.play();

// ============================
// Locomotive Scroll Init
// ============================
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]') || document.body,
  smooth: true
});

// ============================
// GSAP Fade Animations
// ============================
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-text h1", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".hero-text",
    start: "top 80%"
  }
});

gsap.from(".hero-text p", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".hero-text",
    start: "top 80%"
  }
});

// ============================
// Dark Mode Toggle
// ============================
const toggleDarkMode = document.querySelector('#dark-mode-toggle');
toggleDarkMode?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
