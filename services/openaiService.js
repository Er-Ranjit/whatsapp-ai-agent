const { GoogleGenAI } = require("@google/genai");

// Debug
console.log("========== GEMINI DEBUG ==========");
console.log(
  "Gemini Key:",
  process.env.GEMINI_API_KEY
    ? process.env.GEMINI_API_KEY.substring(0, 15) + "..."
    : "NOT FOUND"
);
console.log("==================================");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateReply(userMessage) {
  try {
    console.log("📩 User Message:", userMessage);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a friendly WhatsApp AI Assistant.

Rules:
- Reply in the same language as the user.
- Keep answers short.
- Be polite.
- If the user speaks Hindi, reply in Hindi.
- If the user speaks English, reply in English.

User: ${userMessage}
`,
    });

    console.log("✅ Gemini Response:", response.text);

    return response.text || "🙏 Sorry, I couldn't generate a reply.";

  } catch (error) {
    console.error("❌ Gemini Error:");

    if (error.message) {
      console.error(error.message);
    }

    if (error.status) {
      console.error("Status:", error.status);
    }

    if (error.response) {
      console.error("Response:", JSON.stringify(error.response, null, 2));
    }

    console.error(error);

    return "🙏 Sorry, AI service is temporarily unavailable.";
  }
}

module.exports = {
  generateReply,
};