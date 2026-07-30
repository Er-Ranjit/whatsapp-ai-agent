const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateReply(userMessage) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a friendly WhatsApp AI Assistant.

Rules:
- Reply in the same language as the user.
- Keep answers short.
- Be polite.
- If user speaks Hindi, reply in Hindi.
- If user speaks English, reply in English.

User: ${userMessage}
      `,
    });

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error.message);

    return "🙏 Sorry, AI service is temporarily unavailable.";
  }
}

module.exports = {
  generateReply,
};