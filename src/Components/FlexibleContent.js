import React from 'react';
import HeroSlider from './HeroSlider/HeroSlider';
import LargeText from './LargeText/LargeText';

const FlexibleContent = ({ flexibleContent }) => {
  if (!flexibleContent?.masterFlex) {
    return null;
  }

  return (
    <div className="flexible-content">
      {flexibleContent.masterFlex.map((flexItem, index) => {
        switch (flexItem.__typename) {
          case 'TheFlexMasterFlexHeroSliderLayout':
            return <HeroSlider key={index} data={flexItem} />;
          
          case 'TheFlexMasterFlexLargeTextLayout':
            return <LargeText key={index} data={flexItem} />;
          
          default:
            console.warn(`Unknown flexible content type: ${flexItem.__typename}`);
            return (
              <div key={index} className="unknown-component">
                Unknown component: {flexItem.__typename}
              </div>
            );
        }
      })}
    </div>
  );
};

export default FlexibleContent;
