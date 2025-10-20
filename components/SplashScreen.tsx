import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-green-100 to-emerald-200">
      <div className="text-center animate-fade-in">
        <LeafIcon className="h-24 w-24 text-white mx-auto drop-shadow-lg animate-pulse-slow" />
        <h1 className="text-5xl font-bold text-white tracking-tight mt-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
          PlantSnap
        </h1>
        <p className="text-white/80 mt-2 text-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Your personal plant expert.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
