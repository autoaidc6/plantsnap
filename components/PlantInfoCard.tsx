
import React from 'react';
import { PlantInfo } from '../types';
import { WaterIcon } from './icons/WaterIcon';
import { SunIcon } from './icons/SunIcon';
import { SoilIcon } from './icons/SoilIcon';
import { PestIcon } from './icons/PestIcon';
import { CompanionPlantIcon } from './icons/CompanionPlantIcon';
import { WarningIcon } from './icons/WarningIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface PlantInfoCardProps {
  data: PlantInfo;
}

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold text-green-800 border-b border-green-100 pb-2 mb-4">{title}</h3>
    {children}
  </div>
);

const InfoDetail: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start mb-4 group hover:bg-green-50/50 p-2 rounded-lg transition-colors -mx-2">
    <div className="flex-shrink-0 h-10 w-10 text-green-600 mr-4 flex items-center justify-center bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">{icon}</div>
    <div>
      <p className="font-bold text-gray-800 text-sm mb-0.5">{label}</p>
      <p className="text-gray-600 text-sm leading-relaxed">{value}</p>
    </div>
  </div>
);

const PlantInfoCard: React.FC<PlantInfoCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-green-600 p-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-1">{data.commonName}</h2>
        <p className="text-green-100 italic opacity-90">{data.scientificName}</p>
        
        <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${data.healthAssessment.isHealthy ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
             {data.healthAssessment.isHealthy ? (
                 <><CheckCircleIcon className="w-5 h-5 mr-2" /> Healthy Plant</>
             ) : (
                 <><WarningIcon className="w-5 h-5 mr-2" /> Health Issues Detected</>
             )}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <InfoSection title="About">
          <p className="text-gray-600 leading-relaxed mb-4">{data.description}</p>
          <div className="bg-green-50 p-4 rounded-lg">
             <p className="text-sm text-green-800"><span className="font-bold">Habitat:</span> {data.habitat}</p>
          </div>
        </InfoSection>
        
        {!data.healthAssessment.isHealthy && (
            <InfoSection title="Health Analysis">
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center">
                        <WarningIcon className="w-5 h-5 mr-2"/> Issue Identified
                    </h4>
                    <p className="text-gray-700 mb-4">{data.healthAssessment.issues}</p>
                    
                    <h5 className="font-semibold text-red-800 text-sm mb-1 uppercase tracking-wide">Recommended Treatment</h5>
                    <p className="text-gray-700 text-sm">{data.healthAssessment.treatment}</p>
                </div>
            </InfoSection>
        )}

        <div className="grid md:grid-cols-2 gap-8">
            <InfoSection title="Care Guide">
                <InfoDetail icon={<SunIcon className="w-6 h-6" />} label="Sunlight" value={data.careTips.sunlight} />
                <InfoDetail icon={<WaterIcon className="w-6 h-6" />} label="Watering" value={data.careTips.watering} />
                <InfoDetail icon={<SoilIcon className="w-6 h-6" />} label="Soil" value={data.careTips.soil} />
            </InfoSection>

            <InfoSection title="Eco-Friendly Tips">
                <InfoDetail icon={<PestIcon className="w-6 h-6" />} label="Natural Pest Control" value={data.ecoFriendlySolutions.pestControl} />
                <InfoDetail icon={<CompanionPlantIcon className="w-6 h-6" />} label="Companion Plants" value={data.ecoFriendlySolutions.companionPlants} />
            </InfoSection>
        </div>
      </div>
    </div>
  );
};

export default PlantInfoCard;
