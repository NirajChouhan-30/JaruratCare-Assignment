import { GoogleGenAI } from "@google/genai";

export const analyzeSupportRequest = async (
  description
) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are an NGO healthcare support assistant.

Analyze the following support request:

"${description}"

Return ONLY valid JSON.

{
  "summary": "",
  "priority": "Low|Medium|High",
  "category": "",
  "recommendedAction": ""
}
`,
      });

    console.log(response.text);

    const cleaned = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      summary: "Analysis unavailable",
      priority: "Low",
      category: "General Support",
      recommendedAction:
        "Manual review required",
    };
  }
};