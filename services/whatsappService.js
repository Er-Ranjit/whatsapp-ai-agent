const axios = require("axios");

async function sendWhatsAppMessage(to, message) {

  try {

    const url =
      `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    console.log("🔗 URL:", url);

    await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: message
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ WhatsApp Reply Sent");

  } catch (err) {

    console.log("===== WHATSAPP ERROR =====");

    if (err.response) {
      console.log(JSON.stringify(err.response.data, null, 2));
    } else {
      console.log(err.message);
    }

  }

}

module.exports = {
  sendWhatsAppMessage
};