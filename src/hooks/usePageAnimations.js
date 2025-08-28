import { useEffect, useRef } from 'react';
import { pageAnimations } from '../utils/animations';

export const usePageAnimation = (animationType = 'fadeInUp', options = {}) => {
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