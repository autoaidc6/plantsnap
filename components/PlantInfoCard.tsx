import React from 'react';
import { PlantInfo } from '../types';
import { WaterIcon } from './icons/WaterIcon';
import { SunIcon } from './icons/SunIcon';
import { SoilIcon } from './icons/SoilIcon';
import { PestIcon } from './icons/PestIcon';
import { CompanionPlantIcon } from './icons/CompanionPlantIcon';

interface PlantInfoCardProps {
  data: PlantInfo;
}

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-green-800 border-b-2 border-green-200 pb-2 mb-3">{title}</h3>
    {children}
  </div>
);

const InfoDetail: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start mb-4">
    <div className="flex-shrink-0 h-8 w-8 text-green-600 mr-4 mt-1 bg-green-100 rounded-full p-1.5">{icon}</div>
    <div>
      <p className="font-semibold text-gray-700">{label}</p>
      <p className="text-gray-600 leading-relaxed">{value}</p>
    </div>
  </div>
);

const PlantInfoCard: React.FC<PlantInfoCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-green-900">{data.commonName}</h2>
        <p className="text-md text-gray-500 italic mt-1">{data.scientificName}</p>
      </div>

      <InfoSection title="Description">
        <p className="text-gray-600 leading-relaxed">{data.description}</p>
      </InfoSection>

      <InfoSection title="Habitat">
        <p className="text-gray-600 leading-relaxed">{data.habitat}</p>
      </InfoSection>

      <InfoSection title="Care Tips">
         <InfoDetail icon={<SunIcon />} label="Sunlight" value={data.careTips.sunlight} />
         <InfoDetail icon={<WaterIcon />} label="Watering" value={data.careTips.watering} />
         <InfoDetail icon={<SoilIcon />} label="Soil" value={data.careTips.soil} />
      </InfoSection>

      <InfoSection title="Eco-Friendly Solutions">
         <InfoDetail icon={<PestIcon />} label="Pest Control" value={data.ecoFriendlySolutions.pestControl} />
         <InfoDetail icon={<CompanionPlantIcon />} label="Companion Plants" value={data.ecoFriendlySolutions.companionPlants} />
      </InfoSection>
    </div>
  );
};

export default PlantInfoCard;