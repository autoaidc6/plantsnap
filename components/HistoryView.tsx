
import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { WarningIcon } from './icons/WarningIcon';

interface HistoryViewProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
}

type FilterType = 'All' | 'Healthy' | 'Issues';

const HistoryView: React.FC<HistoryViewProps> = ({ history, onSelectItem }) => {
  const [filter, setFilter] = useState<FilterType>('All');

  const filteredHistory = history.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Healthy') return item.healthAssessment.isHealthy;
    if (filter === 'Issues') return !item.healthAssessment.isHealthy;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold text-green-900">My Plant Collection</h2>
            <p className="text-gray-500 mt-1">{history.length} plants identified</p>
        </div>
        
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200 mt-4 md:mt-0">
          {(['All', 'Healthy', 'Issues'] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === type
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                 {type === 'Issues' && <WarningIcon className="w-4 h-4" />}
                 {type === 'Healthy' && <LeafIcon className="w-4 h-4" />}
                 {type}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-green-50 p-6 rounded-full mb-4">
             <LeafIcon className="w-12 h-12 text-green-300" />
          </div>
          <p className="text-xl font-medium text-gray-800">No plants found</p>
          <p className="text-gray-500 mt-2">Try changing the filter or identify a new plant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
            >
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img src={item.thumbnail} alt={item.commonName} className="w-full h-full object-cover" />
                {!item.healthAssessment.isHealthy && (
                    <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center shadow-sm">
                        <WarningIcon className="w-3 h-3 mr-1" />
                        Issue Detected
                    </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-green-900 text-lg">{item.commonName}</h3>
                <p className="text-xs text-gray-500 italic mb-2">{item.scientificName}</p>
                <div className="flex justify-between items-center mt-3 border-t pt-3">
                    <span className="text-xs text-gray-400">
                        {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.healthAssessment.isHealthy ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.healthAssessment.isHealthy ? 'Healthy' : 'Needs Care'}
                    </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
