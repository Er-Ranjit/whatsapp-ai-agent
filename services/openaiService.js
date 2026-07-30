const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateReply(userMessage) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a friendly WhatsApp AI Assistant. Reply briefly in Hindi or English according to the user's language.

User: ${userMessage}`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return "🙏 Sorry! AI service is temporarily unavailable.";
  }
}

module.exports = { generateReply };