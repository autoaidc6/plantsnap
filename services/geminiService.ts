
import { GoogleGenAI, Type } from "@google/genai";
import { PlantInfo } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Function to convert a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // The result includes the data URL prefix (e.g., "data:image/jpeg;base64,"),
        // which should be removed.
        resolve(reader.result.split(',')[1]);
      } else {
        resolve(''); // Should not happen with readAsDataURL
      }
    };
    reader.readAsDataURL(file);
  });
  const data = await base64EncodedDataPromise;
  return {
    inlineData: {
      data,
      mimeType: file.type,
    },
  };
}

export async function identifyPlant(imageFile: File): Promise<PlantInfo> {
  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `
    Identify the plant in this image. Provide a detailed description, its natural habitat, and care instructions.
    Additionally, offer eco-friendly solutions for pest control and suggest some companion plants.
    Return the information in a valid JSON format. Do not include any markdown formatting like \`\`\`json.
  `;
  
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      commonName: { type: Type.STRING, description: "Common name of the plant." },
      scientificName: { type: Type.STRING, description: "Scientific name of the plant." },
      description: { type: Type.STRING, description: "A brief description of the plant's characteristics." },
      habitat: { type: Type.STRING, description: "The natural habitat or origin of the plant." },
      careTips: {
        type: Type.OBJECT,
        properties: {
          watering: { type: Type.STRING, description: "Watering requirements and schedule." },
          sunlight: { type: Type.STRING, description: "Sunlight needs (e.g., full sun, partial shade)." },
          soil: { type: Type.STRING, description: "Preferred soil type and drainage." },
        },
        required: ["watering", "sunlight", "soil"],
      },
      ecoFriendlySolutions: {
        type: Type.OBJECT,
        properties: {
          pestControl: { type: Type.STRING, description: "Eco-friendly methods to control common pests for this plant." },
          companionPlants: { type: Type.STRING, description: "Plants that grow well alongside this plant." },
        },
        required: ["pestControl", "companionPlants"],
      },
    },
    required: ["commonName", "scientificName", "description", "habitat", "careTips", "ecoFriendlySolutions"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error identifying plant:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to identify plant. The AI model returned an error: ${error.message}`);
    }
    throw new Error("Failed to identify plant due to an unknown error.");
  }
}
