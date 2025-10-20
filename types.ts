
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
}
