const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateReply(userMessage) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly WhatsApp AI Assistant. Reply briefly in Hindi or English according to the user's language."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("OpenAI Error:", error.message);

    return "🙏 Hello! AI service is temporarily unavailable.";
  }
}

module.exports = { generateReply };