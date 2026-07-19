import { PlantInfo } from '../types';

export async function identifyPlant(imageFile: File): Promise<PlantInfo> {
  // Convert File to Base64 data URL
  const base64Promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as base64'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(imageFile);
  });

  try {
    const base64Data = await base64Promise;

    const response = await fetch('/api/identify-plant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Data,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedError = 'Failed to identify plant';
      try {
        const errJson = JSON.parse(errText);
        parsedError = errJson.error || parsedError;
      } catch {
        parsedError = errText || parsedError;
      }
      throw new Error(parsedError);
    }

    return response.json();
  } catch (error) {
    console.error("Error in client identifyPlant:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred during identification.");
  }
}
