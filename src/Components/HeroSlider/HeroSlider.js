import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import styles from './HeroSlider.module.scss';

const HeroSlider = ({ data }) => {
  const glideRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (data && sliderRef.current) {
      // Initialize Glide.js
      glideRef.current = new Glide(sliderRef.current, {
        type: 'carousel',
        perView: 1,
        autoplay: 7000,
        hoverpause: true,
        gap: 0,
        animationDuration: 3000,
      });

      glideRef.current.mount();

      // Cleanup on unmount
      return () => {
        if (glideRef.current) {
          glideRef.current.destroy();
        }
      };
    }
  }, [data]);

  if (!data) return null;

  // Handle both single slide and multiple slides
  const slides = Array.isArray(data.slide) ? data.slide : [data.slide];

  return (
    <div className={styles.heroSlider} ref={sliderRef}>
      <div className={styles.track} data-glide-el="track">
        <ul className={styles.slides}>
          {slides.map((slide, index) => (
            <li key={index} className={styles.slide}>
              {slide?.image?.node && (
                <div className={styles.heroSlide}>
                  <img 
                    srcSet={slide.image.node.srcSet}
                    alt={slide.image.node.altText || 'Hero image'}
                    className={styles.heroImage}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Navigation arrows */}
      <div className={styles.arrows} data-glide-el="controls">
        <button className={`${styles.arrow} ${styles.arrowLeft}`} data-glide-dir="<">
          <span>‹</span>
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} data-glide-dir=">">
          <span>›</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
