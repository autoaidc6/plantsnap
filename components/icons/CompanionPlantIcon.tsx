import React from 'react';

export const CompanionPlantIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M11.25 4.5A6.75 6.75 0 004.5 11.25v2.643a.75.75 0 00.22.53l5.58 4.65a.75.75 0 00.999.002l5.58-4.65a.75.75 0 00.22-.531V11.25A6.75 6.75 0 0011.25 4.5z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M18.75 9.75h.008v.008h-.008v-.008zM18 12.75h.008v.008H18v-.008zM18.75 15h.008v.008h-.008v-.008z" 
      transform="translate(2, -2)"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 11.25c0 1.243-.37 2.383-1.008 3.326"
      strokeDasharray="2 2"
      transform="translate(1, -1)"
    />
  </svg>
);
