
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  // Open mobile menu
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });

  // Close mobile menu
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove("active");
    }
  });

  // GSAP Parallax Scroll Animation
  gsap.to("#parallaxBg", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-container",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
});
