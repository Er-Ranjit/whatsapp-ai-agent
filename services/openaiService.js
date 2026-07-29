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
          content: "You are a helpful WhatsApp AI assistant. Reply in Hindi or English based on the user's language. Keep replies short and friendly."
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
    return "Sorry, I'm having trouble replying right now.";
  }
}

module.exports = { generateReply };