import React, { useState, useCallback, useEffect } from 'react';
import { PlantInfo } from './types';
import { identifyPlant } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import PlantInfoCard from './components/PlantInfoCard';
import Loader from './components/Loader';
import SplashScreen from './components/SplashScreen';
import { LeafIcon } from './components/icons/LeafIcon';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);


  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
    setPlantInfo(null);
    setError(null);
  }, [previewUrl]);

  const handleIdentifyClick = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setPlantInfo(null);

    try {
      const result = await identifyPlant(selectedImage);
      setPlantInfo(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPlantInfo(null);
    setError(null);
    setIsLoading(false);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 text-gray-800 font-sans animate-fade-in">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <LeafIcon className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-green-800 tracking-tight">
            PlantSnap
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-300">
          {!plantInfo && !isLoading && (
             <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Identify a Plant</h2>
                <p className="text-gray-500 mb-6">Take a photo or upload an image to get started.</p>
             </div>
          )}

          <ImageUploader onImageSelect={handleImageSelect} previewUrl={previewUrl} disabled={isLoading} />
          
          {error && (
            <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleIdentifyClick}
              disabled={!selectedImage || isLoading}
              className="w-full flex-1 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 shadow-md hover:shadow-lg disabled:shadow-none"
            >
              {isLoading ? 'Identifying...' : 'Identify Plant'}
            </button>
            {(selectedImage || plantInfo) && (
               <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 transition-colors duration-300"
               >
                 Reset
               </button>
            )}
          </div>
          
          {isLoading && <Loader />}
          
          {plantInfo && !isLoading && (
            <div className="mt-8 animate-fade-in-up">
              <PlantInfoCard data={plantInfo} />
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
}