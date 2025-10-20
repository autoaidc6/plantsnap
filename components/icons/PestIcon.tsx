import React from 'react';

export const PestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075-5.925a1.575 1.575 0 103.15 0v3m-3.15-3v-1.5a1.575 1.575 0 00-3.15 0v1.5m-3.15 0l-.075 5.925m9.075-5.925l.075 5.925M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 21a9 9 0 100-18 9 9 0 000 18z" 
    />
  </svg>
);
