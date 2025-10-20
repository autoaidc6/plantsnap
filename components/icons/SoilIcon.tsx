
import React from 'react';

export const SoilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M12 21v-8.25M15.75 15.75L12 12.75l-3.75 3M15.75 15.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);
