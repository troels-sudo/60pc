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

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initAudienceMemory();
      setActiveNav();
      applyAudienceContext();
    });
  } else {
    initAudienceMemory();
    setActiveNav();
    applyAudienceContext();
  }
})();

