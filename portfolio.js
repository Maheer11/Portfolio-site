"use strict";

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navlinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
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
  e.preventDefault();
  console.log(dark);
  if (dark) {
    body.classList.toggle("darkmode");
    toggleButton.classList.remove("mode-btn");
    toggleButton.classList.add("mode-btn-dark");
    svg.classList.remove("mode-btn-style");
    svg.classList.add("mode-btn-style-dark");
    dark = false;
  } else {
    console.log(dark);
    body.classList.toggle("darkmode");
    toggleButton.classList.remove("mode-btn-dark");
    toggleButton.classList.add("mode-btn");
    svg.classList.remove("mode-btn-style-dark");
    svg.classList.add("mode-btn-style");
    dark = true;
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

/* CONTACT FORM FEED BACK */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    status.style.color = "#555";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        status.textContent = "✅ Message sent successfully!";
        status.style.color = "green";
        form.reset();
      } else {
        status.textContent = "❌ Something went wrong. Please try again.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "⚠️ Network error. Check your connection.";
      status.style.color = "red";
    }
  });
});

const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

readMoreBtn.addEventListener("click", () => {
  if (moreText.style.display === "inline") {
    moreText.style.display = "none";
    readMoreBtn.textContent = "Read more";
  } else {
    moreText.style.display = "inline";
    readMoreBtn.textContent = "Read less";
  }
});
