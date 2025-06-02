// script.js

// Slideshow Video player for index.html
const slides = [
  "Slide Show Design/Slide1.mp4",
  "Slide Show Design/Slide2.mp4",
  "Slide Show Design/Slide3.mp4"
];

let currentSlideIndex = 0;
const slideshowVideo = document.getElementById("slideshowVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextSlideBtn = document.getElementById("nextSlideBtn");
const prevSlideBtn = document.getElementById("prevSlideBtn");

function loadSlide(index) {
  slideshowVideo.src = slides[index];
  slideshowVideo.load();
  slideshowVideo.play();
  playPauseBtn.textContent = "Pause";
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  loadSlide(currentSlideIndex);
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  loadSlide(currentSlideIndex);
}

function togglePlayPause() {
  if (slideshowVideo.paused) {
    slideshowVideo.play();
    playPauseBtn.textContent = "Pause";
  } else {
    slideshowVideo.pause();
    playPauseBtn.textContent = "Play";
  }
}

// Event listeners for controls
playPauseBtn.addEventListener("click", togglePlayPause);
nextSlideBtn.addEventListener("click", nextSlide);
prevSlideBtn.addEventListener("click", prevSlide);

// Auto next slide on video end
slideshowVideo.addEventListener("ended", nextSlide);

// Load first slide on page load
loadSlide(currentSlideIndex);

// Optional: You can add more scripts for login/signup/firebase here if needed
