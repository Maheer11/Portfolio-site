"use strict";

/*===============================================
  MODERN PORTFOLIO JAVASCRIPT - MAHEER
  Enhanced performance with modern ES6+ features
===============================================*/

// DOM Elements Cache
const elements = {
  hamburger: document.getElementById("hamburger"),
  navLinks: document.getElementById("navlinks"),
  themeToggle: document.getElementById("toggleButton"),
  body: document.body,
  contactForm: document.getElementById("contactForm"),
  formStatus: document.getElementById("formStatus"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  projectCards: document.querySelectorAll(".project-card"),
  skillProgresses: document.querySelectorAll(".level-progress")
};

/*===============================================
  NAVIGATION & MOBILE MENU
===============================================*/
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleEscapeKey();
  }

  bindEvents() {
    elements.hamburger?.addEventListener("click", this.toggleMobileMenu.bind(this));
    
    // Close mobile menu when clicking nav links
    elements.navLinks?.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-container") && elements.navLinks?.classList.contains("active")) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    elements.navLinks?.classList.toggle("active");
    elements.hamburger?.classList.toggle("active");
    
    // Toggle aria-expanded for accessibility
    const isExpanded = elements.navLinks?.classList.contains("active");
    elements.hamburger?.setAttribute("aria-expanded", isExpanded);
  }

  closeMobileMenu() {
    elements.navLinks?.classList.remove("active");
    elements.hamburger?.classList.remove("active");
    elements.hamburger?.setAttribute("aria-expanded", "false");
  }

  handleEscapeKey() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && elements.navLinks?.classList.contains("active")) {
        this.closeMobileMenu();
      }
    });
  }
}

// Initialize Navigation
const navigation = new Navigation();

/*===============================================
  THEME TOGGLE SYSTEM
===============================================*/
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'lightmode';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.updateThemeIcon();
  }

  bindEvents() {
    elements.themeToggle?.addEventListener('click', this.toggleTheme.bind(this));
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.applyTheme(e.matches ? 'darkmode' : 'lightmode');
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'lightmode' ? 'darkmode' : 'lightmode';
    this.applyTheme(this.currentTheme);
    this.updateThemeIcon();
    localStorage.setItem('theme', this.currentTheme);
  }

  applyTheme(theme) {
    elements.body.className = theme;
    this.currentTheme = theme;
  }

  updateThemeIcon() {
    const icon = elements.themeToggle?.querySelector('.theme-icon');
    if (!icon) return;

    if (this.currentTheme === 'darkmode') {
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      `;
    } else {
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      `;
    }
  }
}

/*===============================================
  INTERSECTION OBSERVER FOR ANIMATIONS
===============================================*/
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.createObserver();
    this.observeElements();
    this.animateSkillBars();
  }

  createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger skill bar animations when skills section is visible
          if (entry.target.classList.contains('skills-section')) {
            this.animateSkillBars();
          }
        }
      });
    }, options);
  }

  observeElements() {
    const observeTargets = [
      ...elements.projectCards,
      ...document.querySelectorAll('.skill-category'),
      ...document.querySelectorAll('.credential-card'),
      ...document.querySelectorAll('.stat-item'),
      document.querySelector('.skills-section')
    ];

    observeTargets.forEach(el => {
      if (el) this.observer.observe(el);
    });
  }

  animateSkillBars() {
    elements.skillProgresses.forEach((progress, index) => {
      setTimeout(() => {
        const level = progress.getAttribute('data-level');
        progress.style.width = `${level}%`;
      }, index * 100); // Stagger animations
    });
  }
}

// Initialize Theme and Animation Managers
const themeManager = new ThemeManager();
const animationManager = new AnimationManager();

/*===============================================
  PROJECT FILTERING SYSTEM
===============================================*/




// Grab DOM elements
const element = {
  filterButtons: document.querySelectorAll('.filter-btn'),
  projectCards: document.querySelectorAll('.project-card')
};

// ProjectFilter class
class ProjectFilter {
  constructor() {
    this.activeFilter = 'all'; // default filter
    this.init();
  }

  // Initialize filter system
  init() {
    this.bindEvents();       // attach event listeners to buttons
    this.showAllProjects();  // show all projects on load
  }

  // Attach event listeners to filter buttons
  bindEvents() {
    elements.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        const filter = button.getAttribute('data-filter'); // category
        this.filterProjects(filter);                      // filter cards
        this.updateActiveButton(button);                  // highlight button
      });
    });
  }

  // Filter projects based on category
  filterProjects(filter) {
    this.activeFilter = filter;

    elements.projectCards.forEach(card => {
      const categories = card.getAttribute('data-category')
        ?.toLowerCase()
        .split(' ') || [];

      const shouldShow =
        filter === 'all' || categories.includes(filter.toLowerCase());

      if (shouldShow) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease-out forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Update active button UI
  updateActiveButton(activeButton) {
    elements.filterButtons.forEach(btn =>
      btn.classList.remove('active')
    );
    activeButton.classList.add('active');
  }

  // Show all projects initially
  showAllProjects() {
    this.filterProjects('all');
  }
}

// Initialize the filter system
document.addEventListener('DOMContentLoaded', () => {
  new ProjectFilter();
});



/*===============================================
  READ MORE FUNCTIONALITY - REMOVED
  Content now displays in full for better UX
===============================================*/

/*===============================================
  CONTACT FORM MANAGER
===============================================*/
class ContactFormManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    elements.contactForm?.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!elements.formStatus) return;
    
    this.showStatus('Sending message...', 'sending');
    
    try {
      const formData = new FormData(elements.contactForm);
      
      const response = await fetch(elements.contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        this.showStatus('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        elements.contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.hideStatus();
        }, 5000);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showStatus('❌ Something went wrong. Please try again or contact me directly.', 'error');
    }
  }

  showStatus(message, type) {
    if (!elements.formStatus) return;
    
    elements.formStatus.textContent = message;
    elements.formStatus.className = `form-status ${type}`;
    elements.formStatus.style.opacity = '1';
  }

  hideStatus() {
    if (!elements.formStatus) return;
    
    elements.formStatus.style.opacity = '0';
    setTimeout(() => {
      elements.formStatus.textContent = '';
      elements.formStatus.className = 'form-status';
    }, 300);
  }
}

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

  const readMoreBtn = document.getElementById("readMoreBtn");
  const moreText = document.getElementById("moreText");

  // Ensure it's collapsed on load
  moreText.classList.add("collapsed");

  readMoreBtn.addEventListener("click", () => {
    if (moreText.classList.contains("collapsed")) {
      moreText.classList.remove("collapsed");
      moreText.classList.add("expanded");
      readMoreBtn.textContent = "Read Less";
    } else {
      moreText.classList.remove("expanded");
      moreText.classList.add("collapsed");
      readMoreBtn.textContent = "Read More";
    }
  });
  const buttons = document.querySelectorAll(".ed");
  const sections = document.querySelectorAll(".info-cards");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-filter");

      // Hide all sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      // Show selected section
      document.getElementById(target).classList.add("active");
    });
  });

  // Show Experience section by default
  document.getElementById("experience").classList.add("active");
});

const parents = document.querySelectorAll(".edexParent");

parents.forEach((parent) => {
  parent.addEventListener("click", () => {
    //fist close all other .edexChild elements
    parents.forEach((p) => {
      if (p !== parent) {
        p.classList.remove("active");
        const child = p.querySelector(".edexChild");
        if (child) child.style.display = "none";
      }
    });
    //Togggle current one
    parent.classList.toggle("open");
    const child = parent.querySelector(".edexChild");
    if (child) {
      child.style.display = parent.classList.contains("open")
        ? "block"
        : "none";
    }
  });
});

document.querySelectorAll(".edexParent").forEach((parent) => {
  if (parent.textContent.includes("Education")) {
    parent.classList.add("open");
    const child = parent.querySelector(".edexChild");
    if (child) child.style.display = "block";
  }
});
