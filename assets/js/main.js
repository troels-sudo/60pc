// 60 Point Capital - Main JavaScript

(function() {
  'use strict';

  // Store audience selection from landing page
  function initAudienceMemory() {
    const selectorCards = document.querySelectorAll('.selector-card[data-audience]');
    
    selectorCards.forEach(card => {
      card.addEventListener('click', function() {
        const audience = this.getAttribute('data-audience');
        if (audience) {
          try {
            localStorage.setItem('60pcAudience', audience);
          } catch (e) {
            // localStorage not available, ignore
          }
        }
      });
    });
  }

  // Set active nav item based on current page
  function setActiveNav() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('nav a, .sidebar-nav-item');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPage = href.split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
          link.classList.add('sidebar-nav-item--active');
        }
      }
    });
  }

  // Apply audience context to capabilities card if stored
  function applyAudienceContext() {
    try {
      const storedAudience = localStorage.getItem('60pcAudience');
      if (storedAudience) {
        const capabilitiesCard = document.querySelector('.capabilities-card');
        if (capabilitiesCard) {
          // Could add subtle visual indicator or adjust heading
          // For now, just store it for potential future use
        }
      }
    } catch (e) {
      // localStorage not available, ignore
    }
  }

  // Scroll-triggered animations using IntersectionObserver
  function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // If reduced motion, make all fade-in-up elements visible immediately
      const fadeElements = document.querySelectorAll('.fade-in-up');
      fadeElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Use IntersectionObserver for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initAudienceMemory();
      setActiveNav();
      applyAudienceContext();
      initScrollAnimations();
    });
  } else {
    initAudienceMemory();
    setActiveNav();
    applyAudienceContext();
    initScrollAnimations();
  }
})();

