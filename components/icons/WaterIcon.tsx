
import React from 'react';

export const WaterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8.25 18L12 21.75 15.75 18m-7.5-6L12 5.25 15.75 12" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 12.75c-3.142 0-6 2.895-6 6.375 0 1.838.938 3.5 2.4 4.625" 
      transform="translate(0 -5)"
    />
     <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 12.75c3.142 0 6 2.895 6 6.375 0 1.838-.938 3.5-2.4 4.625" 
      transform="translate(0 -5)"
    />
  </svg>
);
