
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { FunctionalMachineData, GenerateMachineResponse } from "../types";

const API_KEY = process.env.API_KEY || "";

const functionalMachineSchema = {
  type: Type.OBJECT,
  properties: {
    nombre: { type: Type.STRING },
    objetivo_funcional: { 
      type: Type.STRING, 
      description: "Descripción técnica ultra-breve (máximo 2 frases)." 
    },
    especificaciones_tecnicas: {
      type: Type.OBJECT,
      properties: {
        capacidad_carga: { type: Type.STRING },
        velocidad_operacion: { type: Type.STRING },
        potencia: { type: Type.STRING },
        eficiencia: { type: Type.STRING },
        factor_seguridad: { type: Type.STRING },
        vida_util: { type: Type.STRING }
      }
    },
    dimensiones: {
      type: Type.OBJECT,
      properties: {
        largo: { type: Type.STRING },
        ancho: { type: Type.STRING },
        alto: { type: Type.STRING },
        tolerancias: { type: Type.STRING }
      }
    },
    calculos_ingenieria: {
      type: Type.ARRAY,
      description: "Exactamente 3 cálculos críticos. No más.",
      items: {
        type: Type.OBJECT,
        properties: {
          nombre: { type: Type.STRING },
          tipo: { type: Type.STRING },
          formula: { type: Type.STRING },
          variables: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                simbolo: { type: Type.STRING },
                descripcion: { type: Type.STRING },
                valor: { type: Type.STRING }
              }
            }
          },
          resultado: { type: Type.STRING },
          unidad: { type: Type.STRING },
          interpretacion: { type: Type.STRING, description: "Máximo 10 palabras." },
          factor_seguridad: { type: Type.STRING }
        }
      }
    },
    simulacion: {
      type: Type.OBJECT,
      properties: {
        tipo_mecanismo: { type: Type.STRING },
        descripcion_secuencia: { 
          type: Type.STRING, 
          description: "Resumen ejecutivo del funcionamiento (máximo 100 caracteres). PROHIBIDO generar párrafos largos." 
        },
        frecuencia_hz: { type: Type.NUMBER },
        componentes_activos: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              nombre: { type: Type.STRING },
              tipo_movimiento: { type: Type.STRING, description: "rotativo|lineal|oscilante" },
              eje: { type: Type.STRING },
              rango: { type: Type.STRING },
              velocidad_nominal: { type: Type.STRING }
            }
          }
        }
      }
    },
    guia_ensamblaje: {
      type: Type.ARRAY,
      description: "Máximo 4 pasos de montaje breves.",
      items: {
        type: Type.OBJECT,
        properties: {
          paso: { type: Type.INTEGER },
          descripcion: { type: Type.STRING }
        }
      }
    },
    lista_materiales: {
      type: Type.ARRAY,
      description: "Máximo 6 materiales esenciales.",
      items: {
        type: Type.OBJECT,
        properties: {
          item: { type: Type.STRING },
          cantidad: { type: Type.STRING },
          especificaciones: { type: Type.STRING },
          norma: { type: Type.STRING }
        }
      }
    },
    consideraciones_seguridad: { type: Type.STRING, description: "Máximo 1 frase." },
    normas_aplicables: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["nombre", "objetivo_funcional", "simulacion", "calculos_ingenieria", "lista_materiales", "dimensiones", "guia_ensamblaje"]
};

function sanitizeJsonResponse(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/```$/, '').trim();
  }
  return cleaned;
}

export async function generateFunctionalMachine(
  prompt: string, 
  language: string
): Promise<GenerateMachineResponse> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `Eres un Ingeniero Mecánico Senior. Genera un JSON técnico CONCISO en ${language}.
  REGLAS DE ESTABILIDAD:
  1. CONCISIÓN RADICAL: Prohibido descripciones de más de 100 caracteres.
  2. SOLO JSON: No incluyas intros ni explicaciones externas.
  3. SIN RAZONAMIENTO EN CAMPOS: No expliques por qué eliges un valor dentro de los strings del JSON.
  4. LÍMITES: Máximo 3 cálculos, 6 materiales, 4 pasos de ensamblaje.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Diseño técnico profesional para: "${prompt}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: functionalMachineSchema,
        maxOutputTokens: 3000, 
        thinkingConfig: { thinkingBudget: 4096 }, // Fix: Budget > 0 for Gemini 3 Pro
      },
    });

    const rawText = response.text || "";
    const sanitizedText = sanitizeJsonResponse(rawText);
    
    try {
      const data = JSON.parse(sanitizedText) as FunctionalMachineData;
      return { data, sources: [] };
    } catch (parseError) {
      console.error("JSON Error:", sanitizedText);
      throw new Error("Respuesta técnica truncada o inválida. Intente una descripción más simple.");
    }
  } catch (apiError: any) {
    console.error("API Error:", apiError);
    throw apiError;
  }
}

export async function generateTechnicalBlueprint(
  machineName: string, 
  view: string,
  components: string[]
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `Professional technical blueprint for: ${machineName}. View: ${view}. Minimalist CAD style, white background, black lines. Clear orthographic projection.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "16:9" } }
  });

  const part = response.candidates[0].content.parts.find(p => p.inlineData);
  if (part?.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  throw new Error("Image generation failed");
}

export async function generateOperationalRender(
  machineName: string,
  objective: string,
  materials: string[]
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `Hyper-realistic 3D render, industrial photography of "${machineName}" in operation. Photorealistic textures, soft shadows, studio lighting.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "16:9" } }
  });

  const part = response.candidates[0].content.parts.find(p => p.inlineData);
  if (part?.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  throw new Error("Render generation failed");
}
