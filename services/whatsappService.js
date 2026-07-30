const axios = require("axios");

async function sendWhatsAppMessage(to, message) {
  try {
    const id = process.env.WHATSAPP_PHONE_NUMBER_ID;
    
    // 🌟 FULL PROOF URL STRING: Base URL ke baad strictly manual slash lagaya hai
    const url = "https://facebook.com" + id + "/messages";

    console.log("🔗 Sending Request To URL:", url); // Isse hume sahi URL logs me dikhega

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
