
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT, CATALOGUE_STRING } from '../constants';
import type { ApiResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define a response schema to ensure the model returns valid JSON.
const apiResponseSchema = {
    type: Type.OBJECT,
    properties: {
      screen: { type: Type.STRING },
      voice: { type: Type.STRING },
      on_screen: { type: Type.STRING },
      chips: { 
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      cta: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          route: { type: Type.STRING },
          params: {
            type: Type.OBJECT,
            properties: {
              oeuvre_id: { type: Type.STRING },
              mode: { type: Type.STRING }
            }
          }
        }
      },
      context: {
        type: Type.OBJECT,
        properties: {
          oeuvre_id: { type: Type.STRING },
          mode: { type: Type.STRING },
          last_zone: { type: Type.STRING }
        }
      },
      ui_hints: {
          type: Type.OBJECT,
          properties: {
              theme: { type: Type.STRING },
              palette_focus: { type: Type.ARRAY, items: { type: Type.STRING } },
              background: { type: Type.STRING },
              stroke_px: { type: Type.NUMBER },
              radius: { type: Type.STRING },
              light_effect: { type: Type.STRING },
              sound: { type: Type.STRING }
          },
          required: ['theme', 'palette_focus', 'background', 'stroke_px', 'radius', 'light_effect', 'sound']
      }
    },
    required: ['screen', 'voice', 'on_screen', 'chips', 'context', 'ui_hints']
  };

export async function getNextScreen(userInput: string): Promise<ApiResponse> {
  const userPrompt = `Here is the catalogue of available artworks for context:
${CATALOGUE_STRING}

---

A new user has provided the following input to the kiosk:
USER_INPUT: "${userInput}"
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: apiResponseSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from API");
    }

    const data: ApiResponse = JSON.parse(text);
    return data;
    
  } catch (error) {
    console.error("Error fetching or parsing AI response:", error);
    
    // Return a structured error response that the UI can render
    return {
      screen: "accueil",
      voice: "Oups! Il y a eu un petit pépin technique. On dirait que mes pinceaux sont coincés. Essayons autre chose, d'accord?",
      on_screen: "Une erreur de communication est survenue.",
      chips: ["🏠 Recommencer à l'accueil"],
      context: {
        mode: 'libre',
        last_zone: null,
        oeuvre_id: null
      },
      ui_hints: {
        theme: 'vitrail',
        palette_focus: ["#D7262E","#1D4ED8","#F2C94C","#0B0B0D","#F6F3EE"],
        background: 'vitrail_mosaic',
        stroke_px: 3,
        radius: 'xl',
        light_effect: 'soft_shimmer',
        sound: 'none'
      }
    };
  }
}
