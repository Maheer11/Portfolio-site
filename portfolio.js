// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navlinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.procards').forEach(card => {
    observer.observe(card);
  });

  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('darkmode');
    if (body.classList.contains('darkmode')) {
      toggleButton.textContent = 'Light Mode';
    } else {
      toggleButton.textContent = 'Dark Mode';
    }
  }); 
