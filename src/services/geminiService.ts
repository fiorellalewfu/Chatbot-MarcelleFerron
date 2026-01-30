import { GoogleGenAI, Type, Chat } from "@google/genai";
import { NAVIGATION_SYSTEM_PROMPT, CHATBOT_SYSTEM_PROMPT } from '../constants/prompts';
import { CATALOGUE_STRING } from '../constants/catalogue';
import type { ApiResponse, ChatMessage } from '../types/index';

// Fix: Adhere to coding guidelines by using process.env.API_KEY for the API key.
// This also resolves the original TypeScript error on 'import.meta.env'.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- 1. Service for App Navigation (JSON Responses) ---

const apiResponseSchema = {
    type: Type.OBJECT,
    properties: {
      screen: { type: Type.STRING },
      voice: { type: Type.STRING },
      on_screen: { type: Type.STRING },
      chips: { type: Type.ARRAY, items: { type: Type.STRING } },
      cta: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, route: { type: Type.STRING }, params: { type: Type.OBJECT, properties: { oeuvre_id: { type: Type.STRING }, mode: { type: Type.STRING } } } } },
      context: { type: Type.OBJECT, properties: { oeuvre_id: { type: Type.STRING }, mode: { type: Type.STRING }, last_zone: { type: Type.STRING } } },
      ui_hints: { type: Type.OBJECT, properties: { theme: { type: Type.STRING }, palette_focus: { type: Type.ARRAY, items: { type: Type.STRING } }, background: { type: Type.STRING }, stroke_px: { type: Type.NUMBER }, radius: { type: Type.STRING }, light_effect: { type: Type.STRING }, sound: { type: Type.STRING } }, required: ['theme', 'palette_focus', 'background', 'stroke_px', 'radius', 'light_effect', 'sound'] }
    },
    required: ['screen', 'voice', 'on_screen', 'chips', 'context', 'ui_hints']
};

export async function getNextScreen(userInput: string): Promise<ApiResponse> {
  const userPrompt = `CATALOGUE:\n${CATALOGUE_STRING}\n\nUSER_INPUT: "${userInput}"`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: NAVIGATION_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: apiResponseSchema,
      },
    });
    const text = response.text.replace(/: "null"/g, ': null');
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching navigation screen:", error);
    return {
      screen: "accueil",
      voice: "Oups! Il y a eu un petit pépin technique. On dirait que mes pinceaux sont coincés. Essayons autre chose, d'accord?",
      on_screen: "Une erreur de communication est survenue.",
      chips: ["🏠 Recommencer à l'accueil"],
      context: { mode: 'libre', last_zone: null, oeuvre_id: null },
      ui_hints: { theme: 'vitrail', palette_focus: ["#D7262E","#1D4ED8","#F2C94C","#0B0B0D","#F6F3EE"], background: 'vitrail_mosaic', stroke_px: 3, radius: 'xl', light_effect: 'soft_shimmer', sound: 'none' }
    };
  }
}

// --- 2. Service for Conversational Chat (Text Responses) ---

let chat: Chat | null = null;

function getChatInstance(): Chat {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: CHATBOT_SYSTEM_PROMPT,
            },
        });
    }
    return chat;
}

export async function sendChatMessage(message: string): Promise<ChatMessage> {
    try {
        const chatInstance = getChatInstance();
        const response = await chatInstance.sendMessage({ message });
        
        const text = response.text;
        if (!text) {
          throw new Error("Empty chat response from API");
        }
        
        return { role: 'model', text: text };

    } catch (error) {
        console.error("Error in chat conversation:", error);
        return {
            role: 'model',
            text: "Pardon, j'ai un peu la tête dans mes couleurs. Peux-tu répéter ta question?"
        };
    }
}
