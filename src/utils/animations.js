import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Page enter animations
export const pageAnimations = {
  // Simple fade in
  fadeIn: (element, duration = 1) => {
    return gsap.fromTo(element, 
      { 
        opacity: 0,
        y: 20
      },
      { 
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out"
      }
    );
  },

  // Fade in from bottom
  fadeInUp: (element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: "power3.out"
      }
    );
  },

  // Staggered animation for multiple elements
  staggerFadeIn: (elements, duration = 0.6, stagger = 0.1) => {
    return gsap.fromTo(elements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power2.out"
      }
    );
  },

  // Hero section animation
  heroAnimation: (container) => {
    const tl = gsap.timeline();
    
    tl.fromTo(container.querySelector('h1'),
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(container.querySelector('p'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(container.querySelectorAll('button, .cta'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" },
      "-=0.3"
    );

    return tl;
  }
};

// Page transition animations
export const pageTransitions = {
  fadeOut: (element, duration = 0.5) => {
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      duration,
      ease: "power2.in"
    });
  },

  slideOut: (element, direction = 'left', duration = 0.5) => {
    const x = direction === 'left' ? -100 : 100;
    return gsap.to(element, {
      opacity: 0,
      x: `${x}%`,
      duration,
      ease: "power2.in"
    });
  }
};