
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

const AboutView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-green-800 mb-2">About PlantSnap</h2>
        <p className="text-lg text-gray-600">The plan and vision for our AI-powered botanical companion.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-50">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <h3 className="text-xl font-bold text-gray-800">Project Vision & Mission</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make botany accessible and engaging for everyone. PlantSnap empowers users to instantly identify plants, understand their needs, and diagnose health issues with a simple photo. We aim to foster a deeper connection with the natural world, turning curiosity into knowledge.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-50">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
             </div>
             <h3 className="text-xl font-bold text-gray-800">Target Audience</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2">
                <span className="font-semibold text-green-700">•</span>
                <span><strong className="text-gray-700">Home Gardeners:</strong> To better care for their plants and diagnose issues.</span>
            </li>
            <li className="flex gap-2">
                <span className="font-semibold text-green-700">•</span>
                <span><strong className="text-gray-700">Hikers & Nature Lovers:</strong> To identify plants and flowers outdoors.</span>
            </li>
            <li className="flex gap-2">
                <span className="font-semibold text-green-700">•</span>
                <span><strong className="text-gray-700">Students:</strong> As a learning tool for botany and science.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-50">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <LeafIcon className="h-6 w-6" />
             </div>
             <h3 className="text-xl font-bold text-gray-800">Core Features</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50/50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-1">Instant ID</h4>
                  <p className="text-sm text-gray-600">Accurate identification from photos.</p>
              </div>
              <div className="bg-green-50/50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-1">Health Analysis</h4>
                  <p className="text-sm text-gray-600">Disease detection and treatment.</p>
              </div>
              <div className="bg-green-50/50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-1">History</h4>
                  <p className="text-sm text-gray-600">Save and organize your collection.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
