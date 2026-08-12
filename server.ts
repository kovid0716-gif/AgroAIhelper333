import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Используем текущую рабочую директорию проекта, совместимую с esbuild/cjs на Render
const __dirname = process.cwd();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

// Раздача скомпилированных статических файлов React-приложения из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

// Инициализация Gemini Client
const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Хелпер для токена Hugging Face
const getHFToken = () => {
  return process.env.HF_TOKEN || process.env.HUGGINGFACE_TOKEN || process.env.HF_API_KEY || null;
};

// Инструкция для ИИ
const SYSTEM_INSTRUCTION = `You are AgroAI Helper, an elite agricultural scientist, botanist, and plant pathologist AI. 
Analyze the provided plant photo or textual description with expert precision.
Identify plant species, diagnose diseases, pest infestations, nutrient deficiencies, watering or environmental stress, or confirm if the plant is completely healthy.

Provide a comprehensive, highly actionable diagnostic output in valid JSON format.
Ensure treatment steps are immediate and organic or eco-friendly where possible.
Provide accurate recommended product categories and realistic care schedules.`;

// Вспомогательная функция анализа через резервный Hugging Face
async function callHuggingFaceAnalysis(prompt?: string, imageBase64?: string, language: string = 'en') {
  const token = getHFToken();
  if (!token) return null;

  const langNameMap: Record<string, string> = {
    en: 'English',
    ru: 'Russian (Русский)',
    kk: 'Kazakh (Қазақша)',
  };
  const targetLangName = langNameMap[language] || 'English';
  const userText = prompt || 'Analyze this plant photo or description for health status, diseases, pests, watering needs, and treatment recommendations.';

  let modelName = 'Qwen/Qwen2.5-72B-Instruct';
  let userContent: any = `${userText} (Respond in ${targetLangName} in valid JSON matching schema).`;

  if (imageBase64) {
    modelName = 'meta-llama/Llama-3.2-11B-Vision-Instruct';
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    userContent = [
      { type: 'text', text: `${userText} (Respond in ${targetLangName} in valid JSON matching schema).` },
      { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${cleanBase64}` } }
    ];
  }

  const systemPrompt = `${SYSTEM_INSTRUCTION}
CRITICAL LANGUAGE REQUIREMENT: All text content MUST BE IN ${targetLangName.toUpperCase()}.
Output strictly valid JSON object with keys: plantName, botanicalName, diseaseName, isHealthy (boolean), confidence (number 80-99), severity ("Healthy"|"Low"|"Moderate"|"High"|"Critical"), summary, symptoms (string array), treatmentSteps (string array), preventativeTips (string array), recommendedProducts (array of objects with id, name, category, description, priceEstimate, rating), careGuide (object with wateringSchedule, humidityLevel, lightRequirement, fertilizerNPK, idealTemperature, soilType), weatherNotes (object with condition, tempImpact, humidityWarning, actionRequired). Do NOT include code markdown syntax or wrapping.`;

  try {
    const res = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        max_tokens: 2048,
        temperature: 0.2,
        response_format: { type: 'json_object' }
      })
    });

    if (!res.ok) {
      console.warn('Hugging Face API returned status:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (content) {
      const cleaned = content.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleaned);
      parsed.id = 'diag-' + Date.now();
      parsed.timestamp = 'Just now';
      parsed.imageUrl = imageBase64 || undefined;
      return parsed;
    }
  } catch (err: any) {
    console.error('Hugging Face API call failed:', err?.message || err);
  }
  return null;
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    plantName: { type: Type.STRING, description: 'Common plant name' },
    botanicalName: { type: Type.STRING, description: 'Botanical / scientific Latin name' },
    diseaseName: { type: Type.STRING, description: 'Diagnosed disease, deficiency, pest, or "Healthy Plant"' },
    isHealthy: { type: Type.BOOLEAN, description: 'True if plant has no disease or stress' },
    confidence: { type: Type.INTEGER, description: 'Confidence percentage between 80 and 99' },
    severity: { type: Type.STRING, description: 'One of: Healthy, Low, Moderate, High, Critical' },
    summary: { type: Type.STRING, description: '2-3 sentence executive diagnosis summary' },
    symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
    treatmentSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
    preventativeTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommendedProducts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          description: { type: Type.STRING },
          priceEstimate: { type: Type.STRING },
          rating: { type: Type.NUMBER }
        },
        required: ['id', 'name', 'category', 'description', 'priceEstimate']
      }
    },
    careGuide: {
      type: Type.OBJECT,
      properties: {
        wateringSchedule: { type: Type.STRING },
        humidityLevel: { type: Type.STRING },
        lightRequirement: { type: Type.STRING },
        fertilizerNPK: { type: Type.STRING },
        idealTemperature: { type: Type.STRING },
        soilType: { type: Type.STRING }
      },
      required: ['wateringSchedule', 'humidityLevel', 'lightRequirement', 'fertilizerNPK', 'idealTemperature', 'soilType']
    },
    weatherNotes: {
      type: Type.OBJECT,
      properties: {
        condition: { type: Type.STRING },
        tempImpact: { type: Type.STRING },
        humidityWarning: { type: Type.STRING },
        actionRequired: { type: Type.STRING }
      },
      required: ['condition', 'tempImpact', 'humidityWarning', 'actionRequired']
    }
  },
  required: [
    'plantName', 'botanicalName', 'diseaseName', 'isHealthy', 'confidence',
    'severity', 'summary', 'symptoms', 'treatmentSteps', 'preventativeTips',
    'recommendedProducts', 'careGuide', 'weatherNotes'
  ]
};

// Главный API-эндпоинт анализа
app.post('/api/analyze', async (req, res) => {
  try {
    const { prompt, imageBase64, mimeType = 'image/jpeg', language = 'en' } = req.body;
    const ai = getGeminiAI();

    const langNameMap: Record<string, string> = {
      en: 'English',
      ru: 'Russian',
      kk: 'Kazakh'
    };
    const targetLangName = langNameMap[language] || 'English';

    const dynamicSystemInstruction = `${SYSTEM_INSTRUCTION}
CRITICAL LANGUAGE REQUIREMENT: All text content in the output JSON MUST BE WRITTEN IN ${targetLangName.toUpperCase()}.`;

    // Если основной Gemini API доступен
    if (ai) {
      try {
        const contents: any[] = [];

        if (imageBase64) {
          const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
          contents.push({
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType
            }
          });
        }

        contents.push({
          text: prompt || 'Analyze this plant status and provide expert diagnostics.'
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: contents,
          config: {
            systemInstruction: dynamicSystemInstruction,
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA
          }
        });

        const textResponse = response.text;
        if (textResponse) {
          const parsed = JSON.parse(textResponse);
          parsed.id = 'diag-' + Date.now();
          parsed.timestamp = 'Just now';
          parsed.imageUrl = imageBase64 || undefined;
          return res.json(parsed);
        }
      } catch (geminiError: any) {
        console.warn('Gemini API failed, switching to Hugging Face fallback...', geminiError?.message || geminiError);
      }
    }

    // Если Gemini отключен или упал — вызываем Hugging Face
    const hfFallbackData = await callHuggingFaceAnalysis(prompt, imageBase64, language);
    if (hfFallbackData) {
      return res.json(hfFallbackData);
    }

    throw new Error('All AI service endpoints failed or are unconfigured.');

  } catch (error: any) {
    console.error('Analysis endpoint failure:', error);
    res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
});

// Перенаправление всех остальных GET-запросов на индексную страницу Single Page Application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`◇ AgroAI Helper Server active on port ${PORT}`);
});
