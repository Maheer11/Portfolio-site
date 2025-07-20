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
    body.classList.toggle('lightmode');
    if (body.classList.contains('darkmode')) {
      toggleButton.textContent = '☀︎ Light Mode';
    } else {
      toggleButton.textContent = '☼ Dark Mode';
    }
  }); 

  const filterButtons = document.querySelectorAll('#filter-buttons button');
  const projectCards = document.querySelectorAll('.procards');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove "active" from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter').toLowerCase();

      projectCards.forEach(card => {
        const techs = card.getAttribute('data-tech').toLowerCase().split(',').map(t => t.trim());

        if (filter === 'all' || techs.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
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