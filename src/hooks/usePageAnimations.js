import { useEffect, useRef } from 'react';
import { pageAnimations } from '../utils/animations';

export const usePageAnimation = (animationType = 'fadeIn', options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { duration = 1, delay = 0 } = options;
    
    // Set initial state
    gsap.set(containerRef.current, { opacity: 0 });

    // Animate in
    const animation = pageAnimations[animationType](
      containerRef.current, 
      duration, 
      delay
    );

    // Cleanup function
    return () => {
      if (animation) animation.kill();
    };
  }, [animationType, options]);

  return containerRef;
};

// 4. Page Transition Component (components/PageTransition.jsx)
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { pageAnimations } from '../utils/animations';

const PageTransition = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial state - hidden
    gsap.set(containerRef.current, { 
      opacity: 0,
      y: 20
    });

    // Animate in with delay for smooth transition
    const tl = gsap.timeline({ delay: 0.1 });
    
    tl.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className={`page-container ${className}`}>
      {children}
    </div>
  );
};

export default PageTransition;