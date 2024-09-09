// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const generatePromptByFilter = (userData) => {
  return `
    Based on the data below, suggest maximum 12 book titles in the below JSON format
    
    data: ${JSON.stringify(userData)}
    sample output JSON:
    [{"title": "The White Tiger"}, {"title": "A House For Mr. Biswas"}]
    
    Answer:
  `;
}

const generatePromptByLastReads = (userData) => {
  return `
    Based on these titles ${userData}, which is a users' last read books, suggest maximum 12 book titles 
    that this user may like in the below JSON format. Do not send any of the last read books in the response.
    
    sample output JSON:
    [{"title": "The White Tiger"}, {"title": "A House For Mr. Biswas"}]
    
    Answer:
  `;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { searchType, ...data } = req.body;
      let result;
      let prompt;

      if (searchType.toLowerCase() === 'filter') {  
        prompt = generatePromptByFilter({ ...data });
      } else {
        prompt = generatePromptByLastReads(data.titles);
      }

      console.log("Generated prompt:", prompt);

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [{ text: "HELLO" }],
          },
          {
            role: "model",
            parts: [{ text: "Hello there! How can I assist you today?" }],
          },
        ],
      });

      const chatResult = await chat.sendMessage(prompt);
      result = JSON.parse(chatResult.response.text()); // Ensure proper JSON format
      
      console.log("API result:", result); // Log to verify structure
      
      return res.json({ result });
    } else {
      return res.status(400).json({ message: 'Method not supported' });
    }
  } catch (e) {
    console.error("API Error:", e);
    return res.status(500).json({ message: `Error occurred: ${e.message}` });
  }
}
