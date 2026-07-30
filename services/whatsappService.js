const axios = require("axios");

async function sendWhatsAppMessage(to, message) {

    try {

        await axios.post(

            `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,

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

    }

    catch(err){

        console.log(err.response?.data || err.message);

    }

}

module.exports = {

    sendWhatsAppMessage

};