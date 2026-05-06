document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu functionality
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      navMenu.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Slideshow functionality
  let autoSlideIndex = 0;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  
  // Only initialize if slides exist
  if (slides.length > 0) {
    showAutoSlides();
    
    // Pause slideshow when user interacts with it
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', pauseSlideshow);
      slideshowContainer.addEventListener('mouseleave', resumeSlideshow);
      slideshowContainer.addEventListener('focusin', pauseSlideshow);
      slideshowContainer.addEventListener('focusout', resumeSlideshow);
    }
  }
  
  function showAutoSlides() {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    
    autoSlideIndex++;
    if (autoSlideIndex > slides.length) { 
      autoSlideIndex = 1; 
    }
    
    // Update dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show current slide
    if (slides[autoSlideIndex-1]) {
      slides[autoSlideIndex-1].style.display = "block";
    }
    
    if (dots[autoSlideIndex-1]) {
      dots[autoSlideIndex-1].className += " active";
    }
    
    // Set timeout for next slide if not paused
    if (!window.slideshowPaused) {
      window.slideshowTimeout = setTimeout(showAutoSlides, 4000); // 4 seconds
    }
  }
  
  function pauseSlideshow() {
    window.slideshowPaused = true;
    clearTimeout(window.slideshowTimeout);
  }
  
  function resumeSlideshow() {
    window.slideshowPaused = false;
    showAutoSlides();
  }
  
  // Manual slide control function
  window.currentSlide = function(n) {
    autoSlideIndex = n - 1;
    pauseSlideshow();
    showAutoSlides();
  };
  
  // Keyboard navigation for slideshow
  document.addEventListener('keydown', function(event) {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer && document.activeElement.closest('.slideshow-container')) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        autoSlideIndex -= 2;
        if (autoSlideIndex < 0) autoSlideIndex = slides.length - 1;
        pauseSlideshow();
        showAutoSlides();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        pauseSlideshow();
        showAutoSlides();
      }
    }
  });
  
  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger loading
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
});
