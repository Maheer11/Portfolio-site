'use strict'

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navlinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".procards").forEach((card) => {
  observer.observe(card);
});

const toggleButton = document.querySelector(".mode-btn");
const body = document.body;
const svg = document.querySelector(".mode-btn-style");

let dark = true;


toggleButton.addEventListener("click", (e) => {
  e.preventDefault()
  console.log(dark)
  if (dark) {
    
    body.classList.toggle("darkmode");
    toggleButton.classList.remove("mode-btn");
    toggleButton.classList.add("mode-btn-dark");
    svg.classList.remove("mode-btn-style");
    svg.classList.add("mode-btn-style-dark");
    dark = false
  }
  else{
    console.log(dark)
    body.classList.toggle("darkmode");
    toggleButton.classList.remove("mode-btn-dark");
    toggleButton.classList.add("mode-btn");
    svg.classList.remove("mode-btn-style-dark");
    svg.classList.add("mode-btn-style");
    dark = true
  }

  // if (body.classList.contains("dark-mode")) {
  //   toggleIcon.src = "images/darkmode.png"; // show sun in dark mode
  //   toggleIcon.alt = "Toggle Dark Mode";
  // } else {
  //   toggleIcon.src = "images/lightmode.png"; // show moon in light mode
  //   toggleIcon.alt = "Switch to Dark Mode";
  // }
});

const filterButtons = document.querySelectorAll("#filter-buttons button");
const projectCards = document.querySelectorAll(".procards");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove "active" from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter").toLowerCase();

    projectCards.forEach((card) => {
      const techs = card
        .getAttribute("data-tech")
        .toLowerCase()
        .split(",")
        .map((t) => t.trim());

      if (filter === "all" || techs.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* const btn = document.getElementByClassName('btn');

  btn.addEventListener('click', () => {
    // Trigger download (replace with actual file URL)
    const link = document.createElement('a');
    link.href = 'maheer.pdf'; // <-- your actual CV file path
    link.download = 'maheer.pdf';
    link.click();

    // Add pulse effect
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 600);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }); */
