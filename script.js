/* script.js - PH Sai Nath Portfolio */

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initialize Lenis Smooth Scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // spring-like deceleration
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-list');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinkItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. Hero Entrance Animations (GSAP)
  const heroTL = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

  // Initial setup for animated elements to avoid flash of unstyled content
  gsap.set('.logo, .nav-link, .hero-pretitle, .hero-title, .hero-subtitle, .hero-desc, .tag, .watercolor-frame', {
    opacity: 0,
    y: 30
  });
  
  heroTL.to('.logo', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to('.nav-link', { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 }, 0.3)
        .to('.hero-pretitle', { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        .to('.hero-title', { opacity: 1, y: 0, duration: 1 }, 0.6)
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8 }, 0.8)
        .to('.tag', { opacity: 1, y: 0, stagger: 0.08, duration: 0.8 }, 0.9)
        .to('.watercolor-frame', { opacity: 1, y: 0, duration: 1.2 }, 0.6);

  // 4. Mouse Parallax (Tilt Card Effect on Cinematic Center Component)
  const tiltCard = document.getElementById('parallax-card');
  const tiltBg = document.getElementById('parallax-bg');

  if (tiltCard && tiltBg) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside element
      const y = e.clientY - rect.top;  // y position inside element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (-10 to 10 degrees)
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      // Calculate background movement offset (-15 to 15px)
      const moveX = ((x - centerX) / centerX) * -15;
      const moveY = ((y - centerY) / centerY) * -15;

      gsap.to(tiltCard, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        boxShadow: `0 35px 70px rgba(0, 0, 0, 0.9), 
                    ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(139, 92, 246, 0.15)`,
        ease: 'power2.out',
        duration: 0.5
      });

      gsap.to(tiltBg, {
        x: moveX,
        y: moveY,
        scale: 1.08,
        ease: 'power2.out',
        duration: 0.5
      });
    });

    tiltCard.addEventListener('mouseleave', () => {
      gsap.to(tiltCard, {
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8)',
        ease: 'power3.out',
        duration: 0.8
      });

      gsap.to(tiltBg, {
        x: 0,
        y: 0,
        scale: 1.05,
        ease: 'power3.out',
        duration: 0.8
      });
    });
  }

  // 5. ScrollTrigger Animations for Page Sections
  
  // Section Headers Reveal
  document.querySelectorAll('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // About Section Content Reveal
  gsap.from('.about-text .about-bio', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%'
    },
    opacity: 0,
    y: 35,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.about-meta', {
    scrollTrigger: {
      trigger: '.about-meta',
      start: 'top 80%'
    },
    opacity: 0,
    x: 40,
    duration: 1.2,
    ease: 'power4.out'
  });

  // Skills Section Reveal
  gsap.from('.skill-category', {
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 75%'
    },
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out'
  });

  // Projects Section Reveal
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 75%'
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: 'power4.out'
  });

  // Contact Section Components Reveal
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%'
    },
    opacity: 0,
    x: -30,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.contact-form-card', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%'
    },
    opacity: 0,
    x: 30,
    duration: 1,
    ease: 'power3.out'
  });

  // 6. Contact Form Submission (Mock handling with user feedback)
  const contactForm = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('submit-btn-element');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> MESSAGE SENT!';
        submitBtn.style.background = 'var(--joker-green)';
        submitBtn.style.boxShadow = '0 10px 20px var(--joker-green-glow)';
        
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = 'linear-gradient(90deg, var(--joker-purple), var(--joker-green))';
          submitBtn.style.boxShadow = '';
        }, 3000);
      }, 1500);
    });
  }

});
