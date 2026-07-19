import { GoogleGenAI, Type } from "@google/genai";
import { PlantInfo } from '../types';

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but was not set.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export async function identifyPlantServer(base64DataUrl: string): Promise<PlantInfo> {
  const ai = getGeminiClient();
  // Extract base64 and mimeType from data URL
  const matches = base64DataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid base64 image data URL format");
  }
  const mimeType = matches[1];
  const base64Data = matches[2];

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };

  const prompt = `
    Identify the plant in this image. Provide a detailed description, its natural habitat, and care instructions.
    Analyze the plant's health visible in the image. Determine if it is healthy or has diseases/pests.
    If it has issues, describe them and provide eco-friendly treatment solutions.
    Also offer general eco-friendly pest control advice and companion plants.
    Return the information in a valid JSON format.
  `;
  
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      commonName: { type: Type.STRING, description: "Common name of the plant." },
      scientificName: { type: Type.STRING, description: "Scientific name of the plant." },
      description: { type: Type.STRING, description: "A brief description of the plant." },
      habitat: { type: Type.STRING, description: "The natural habitat." },
      careTips: {
        type: Type.OBJECT,
        properties: {
          watering: { type: Type.STRING },
          sunlight: { type: Type.STRING },
          soil: { type: Type.STRING },
        },
        required: ["watering", "sunlight", "soil"],
      },
      ecoFriendlySolutions: {
        type: Type.OBJECT,
        properties: {
          pestControl: { type: Type.STRING, description: "General eco-friendly pest control methods." },
          companionPlants: { type: Type.STRING },
        },
        required: ["pestControl", "companionPlants"],
      },
      healthAssessment: {
        type: Type.OBJECT,
        properties: {
          isHealthy: { type: Type.BOOLEAN, description: "True if the plant looks healthy, false otherwise." },
          issues: { type: Type.STRING, description: "Description of any diseases or pests found. 'None' if healthy." },
          treatment: { type: Type.STRING, description: "Recommended treatment for identified issues. 'N/A' if healthy." },
        },
        required: ["isHealthy", "issues", "treatment"],
      }
    },
    required: ["commonName", "scientificName", "description", "habitat", "careTips", "ecoFriendlySolutions", "healthAssessment"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text?.trim() || "{}";
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error identifying plant on server:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to identify plant: ${error.message}`);
    }
    throw new Error("Failed to identify plant due to an unknown error.");
  }
}
