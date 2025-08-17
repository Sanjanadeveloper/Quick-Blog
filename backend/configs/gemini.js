import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

async function main(prompt) {
  try {
    console.log("Gemini API called with prompt:", prompt); // Debug log
    console.log("Using API key:", process.env.GEMINI_API_KEY ? "Present" : "Missing"); // Debug log
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    console.log("Gemini response received:", response ? "Success" : "Failed"); // Debug log
    return response.text
  } catch (error) {
    console.error("Error in Gemini API:", error); // Debug log
    throw error;
  }
}

export default main;