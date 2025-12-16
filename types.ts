
export interface PlantInfo {
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string;
  careTips: {
    watering: string;
    sunlight: string;
    soil: string;
  };
  ecoFriendlySolutions: {
    pestControl: string;
    companionPlants: string;
  };
  healthAssessment: {
    isHealthy: boolean;
    issues: string;
    treatment: string;
  };
}

export interface HistoryItem extends PlantInfo {
  id: string;
  timestamp: number;
  thumbnail: string; // Base64 image data
}
