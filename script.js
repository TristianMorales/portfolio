// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('header-scrolled', window.scrollY > 100);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  document.querySelector('.contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your message! I’ll get back to you soon.');
    e.target.reset();
  });

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => console.log('Gallery item clicked'));
  });
});
