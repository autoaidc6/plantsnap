
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { CameraIcon } from './icons/CameraIcon';
import { LeafIcon } from './icons/LeafIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface HomeViewProps {
  onImageSelect: (file: File) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onImageSelect }) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="text-center max-w-2xl mb-10">
        <h2 className="text-4xl font-bold text-green-800 mb-4">Identify Any Plant Instantly</h2>
        <p className="text-lg text-gray-600">
          Take a photo or upload an image to discover plant species, health status, and get expert care recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
        {/* Camera Option */}
        <input
          type="file"
          ref={cameraInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
        />
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="group relative flex flex-col items-center justify-center p-8 h-64 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white"
        >
          <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:bg-white/30 transition-colors">
            <CameraIcon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Take Photo</h3>
          <p className="text-green-100 text-sm">Use your camera to snap a plant</p>
        </button>

        {/* Upload Option */}
        <input
          type="file"
          ref={galleryInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => galleryInputRef.current?.click()}
          className="group relative flex flex-col items-center justify-center p-8 h-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-100 hover:border-green-500"
        >
          <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
            <UploadIcon className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">Upload Photo</h3>
          <p className="text-gray-500 text-sm">Choose from your gallery</p>
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-green-100 p-3 rounded-full mb-4 text-green-600">
            <SparklesIcon className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">AI-Powered</h4>
          <p className="text-sm text-gray-500">Advanced identification using cutting-edge AI technology</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-green-100 p-3 rounded-full mb-4 text-green-600">
            <LeafIcon className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Health Check</h4>
          <p className="text-sm text-gray-500">Detect diseases and get eco-friendly treatment solutions</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-green-100 p-3 rounded-full mb-4 text-green-600">
            <BookOpenIcon className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Care Guide</h4>
          <p className="text-sm text-gray-500">Detailed care instructions and growing tips</p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
