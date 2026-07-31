const axios = require("axios");

async function generateReply(userMessage) {
  try {
    console.log("📩 User Message:", userMessage);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly WhatsApp AI Assistant. Reply in the same language as the user. Keep replies short."
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
          "HTTP-Referer": "https://whatsapp-ai-agent-wrxm.onrender.com",
          "X-Title": "WhatsApp AI Bot"
        }
      }
    );

    const reply =
      response.data.choices[0].message.content;

    console.log("🤖 AI Reply:", reply);

    return reply;

  } catch (err) {

    console.log("===== OPENROUTER ERROR =====");

    if (err.response) {
      console.log(JSON.stringify(err.response.data, null, 2));
    } else {
      console.log(err.message);
    }

    return "Sorry, AI is unavailable.";
  }
}

module.exports = {
  generateReply
};