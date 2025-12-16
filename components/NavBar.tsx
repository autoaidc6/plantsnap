
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { CameraIcon } from './icons/CameraIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { InfoIcon } from './icons/InfoIcon';

interface NavBarProps {
  currentView: string;
  onChangeView: (view: 'home' | 'history' | 'about') => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentView, onChangeView }) => {
  const NavItem = ({ view, label, icon }: { view: 'home' | 'history' | 'about', label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => onChangeView(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium ${
        currentView === view
          ? 'bg-green-100 text-green-800 shadow-sm'
          : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-green-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onChangeView('home')}
          >
            <div className="bg-green-600 rounded-full p-1.5 mr-2 shadow-md">
                <LeafIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 tracking-tight">
              PlantSnap
            </h1>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <NavItem view="home" label="Home" icon={<CameraIcon className="w-4 h-4" />} />
            <NavItem view="history" label="History" icon={<HistoryIcon className="w-4 h-4" />} />
            <NavItem view="about" label="About" icon={<InfoIcon className="w-4 h-4" />} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
