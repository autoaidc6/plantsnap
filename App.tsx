
import React, { useState, useEffect } from 'react';
import { PlantInfo, HistoryItem } from './types';
import { identifyPlant } from './services/geminiService';
import PlantInfoCard from './components/PlantInfoCard';
import Loader from './components/Loader';
import SplashScreen from './components/SplashScreen';
import HomeView from './components/HomeView';
import HistoryView from './components/HistoryView';
import AboutView from './components/AboutView';
import NavBar from './components/NavBar';

type ViewState = 'home' | 'history' | 'about' | 'details';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    const savedHistory = localStorage.getItem('plantSnapHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    return () => clearTimeout(timer);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('plantSnapHistory', JSON.stringify(history));
  }, [history]);

  const handleImageSelect = async (file: File) => {
    // Create local preview
    const previewUrl = URL.createObjectURL(file);
    setSelectedImagePreview(previewUrl);
    
    setIsLoading(true);
    setError(null);
    setPlantInfo(null);
    setCurrentView('details'); // Switch to details view immediately to show loader

    try {
      // 1. Identify plant
      const result = await identifyPlant(file);
      setPlantInfo(result);

      // 2. Compress image for storage (simple canvas resize to avoid localStorage quota)
      // For this demo, we'll use the preview URL if it's small, but realistically we need base64
      // We will create a small thumbnail base64
      const thumbnailBase64 = await createThumbnail(file);

      // 3. Add to history
      const newHistoryItem: HistoryItem = {
        ...result,
        id: Date.now().toString(),
        timestamp: Date.now(),
        thumbnail: thumbnailBase64
      };

      setHistory(prev => [newHistoryItem, ...prev]);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      // Stay on details view to show error, but maybe offer retry?
    } finally {
      setIsLoading(false);
    }
  };

  const createThumbnail = (file: File): Promise<string> => {
      return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
              const img = new Image();
              img.onload = () => {
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  const MAX_WIDTH = 300;
                  const scale = MAX_WIDTH / img.width;
                  canvas.width = MAX_WIDTH;
                  canvas.height = img.height * scale;
                  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                  resolve(canvas.toDataURL('image/jpeg', 0.7));
              };
              img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
      });
  };

  const handleHistoryItemSelect = (item: HistoryItem) => {
    setPlantInfo(item);
    setCurrentView('details');
    window.scrollTo(0,0);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 text-gray-800 font-sans">
      <NavBar 
        currentView={currentView === 'details' ? 'home' : currentView} 
        onChangeView={(view) => {
            setCurrentView(view);
            setError(null);
        }} 
      />

      <main className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-80px)]">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
           <HomeView onImageSelect={handleImageSelect} />
        )}

        {/* VIEW: HISTORY */}
        {currentView === 'history' && (
           <HistoryView history={history} onSelectItem={handleHistoryItemSelect} />
        )}

        {/* VIEW: ABOUT */}
        {currentView === 'about' && (
           <AboutView />
        )}

        {/* VIEW: DETAILS / LOADING / ERROR */}
        {currentView === 'details' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <button 
                onClick={() => setCurrentView('home')}
                className="mb-4 text-green-700 font-semibold flex items-center hover:underline"
            >
                ← Back to Home
            </button>

            {isLoading && <Loader />}
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-md shadow-md" role="alert">
                    <p className="font-bold text-lg mb-2">Identification Failed</p>
                    <p>{error}</p>
                    <button 
                        onClick={() => setCurrentView('home')}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {plantInfo && !isLoading && (
               <div className="animate-fade-in-up">
                   {/* If it's a fresh identification, show the source image at the top */}
                   {!history.find(h => h === plantInfo) && selectedImagePreview && (
                       <div className="mb-6 rounded-2xl overflow-hidden shadow-lg max-h-64 object-cover w-full">
                           <img src={selectedImagePreview} alt="Captured plant" className="w-full h-full object-cover" style={{maxHeight: '300px', objectPosition: 'center'}} />
                       </div>
                   )}
                   <PlantInfoCard data={plantInfo} />
               </div>
            )}
          </div>
        )}

      </main>

      <footer className="text-center py-6 text-sm text-gray-400 bg-white/50">
        <p>© {new Date().getFullYear()} PlantSnap. Powered by Gemini AI.</p>
      </footer>
    </div>
  );
}
