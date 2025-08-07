// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Header scroll effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header-scrolled', window.scrollY > 100);
    });
  }

  // Mobile menu toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate hamburger bars
      const bars = mobileMenu.querySelectorAll('.bar');
      bars.forEach((bar, index) => {
        if (navLinks.classList.contains('active')) {
          if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
          if (index === 1) bar.style.opacity = '0';
          if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
          bar.style.transform = '';
          bar.style.opacity = '';
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        // Reset hamburger bars
        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach(bar => {
          bar.style.transform = '';
          bar.style.opacity = '';
        });
      }
    });

    // Close mobile menu when clicking a link
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        // Reset hamburger bars
        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach(bar => {
          bar.style.transform = '';
          bar.style.opacity = '';
        });
      }
    });
  }

  // Smooth scrolling for anchor links (single page navigation)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  });

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Portfolio filtering (for portfolio page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter gallery items
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            item.style.display = 'block';
          } else {
            item.classList.add('hidden');
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Show success message
      alert(`Thank you, ${name}! I'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
      
      // Here you would typically send the data to your server
      // Example: fetch('/submit-form', { method: 'POST', body: formData })
    });
  }

  // Gallery item click effect
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
      // You can add a lightbox or modal here
      console.log('Gallery item clicked:', this.querySelector('img')?.alt);
      
      // Example: Could open in lightbox
      // openLightbox(this.querySelector('img').src);
    });
  });

  // Add loading state to CTA buttons
  document.querySelectorAll('.cta-button, .submit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Don't add loading state if it's a link
      if (this.tagName === 'A') return;
      
      const originalText = this.textContent;
      this.textContent = 'Loading...';
      this.disabled = true;
      
      // Re-enable after form processing
      setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
      }, 2000);
    });
  });

  // Lazy load images (optional performance enhancement)
  const images = document.querySelectorAll('img[data-src]');
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Add smooth transitions to page loads
  document.body.classList.add('loaded');

});

// Add CSS class for page loaded state
document.head.insertAdjacentHTML('beforeend', `
  <style>
    body { opacity: 0; transition: opacity 0.3s ease; }
    body.loaded { opacity: 1; }
    
    /* Loading state for buttons */
    .cta-button:disabled,
    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none !important;
    }
    
    /* Lazy loading placeholder */
    img.lazy {
      filter: blur(5px);
      transition: filter 0.3s;
    }
    
    img:not(.lazy) {
      filter: blur(0);
    }
  </style>
`);

