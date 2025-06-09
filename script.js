// ✅ HERO SLIDESHOW LOGIC
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 5000); // 5 seconds per slide

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function goToSlide(n) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(slideInterval); // pause auto when manual dot clicked
    goToSlide(index);
    slideInterval = setInterval(nextSlide, 5000);
  });
});

// ✅ HAMBURGER MENU TOGGLE
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  sideMenu.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("open");
});

// ✅ CLICK OUTSIDE TO CLOSE MENU
document.addEventListener("click", function (event) {
  if (
    !sideMenu.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    sideMenu.classList.remove("open");
  }
});
