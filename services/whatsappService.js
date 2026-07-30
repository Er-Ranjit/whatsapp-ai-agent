const axios = require("axios");

async function sendWhatsAppMessage(to, message) {
  try {
    // 🌟 EXACT META URL (Isme se ek bhi word misplace nahi hona chahiye)
    const url = "https://facebook.com";

    console.log("🔗 Real Final URL Built:", url); 

    await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          Authorization: "Bearer " + process.env.WHATSAPP_ACCESS_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("✅ WhatsApp Reply Sent successfully!");
  } catch (err) {
    console.log("❌ WHATSAPP SEND ERROR DETAILS:");
    if (err.response) {
      console.log(JSON.stringify(err.response.data, null, 2));
    } else {
      console.log(err.message);
    }
  }
}

module.exports = { sendWhatsAppMessage };
