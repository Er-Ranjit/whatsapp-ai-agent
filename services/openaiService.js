const axios = require("axios");

async function generateReply(userMessage) {
  try {
    console.log("📩 User:", userMessage);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.3-8b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly WhatsApp AI assistant. Reply in the same language as the user. Keep answers short."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://whatsapp-ai-agent.onrender.com",
          "X-Title": "WhatsApp AI Bot"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    console.log("🤖 AI:", reply);

    return reply;

  } catch (err) {
    console.log(err.response?.data || err.message);
    return "Sorry, AI is unavailable.";
  }
}

module.exports = { generateReply };