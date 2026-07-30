const axios = require("axios");

async function sendWhatsAppMessage(to, message) {
  try {
    await axios.post(
      `https://facebook.com{process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
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
