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