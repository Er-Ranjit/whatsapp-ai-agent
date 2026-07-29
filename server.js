const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const { generateReply } = require("./services/openaiService");
const { sendWhatsAppMessage } = require("./services/whatsappService");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("WhatsApp AI Bot Running...");
});

// Webhook Verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("Webhook Verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Incoming Messages
app.post("/webhook", async (req, res) => {
   console.log("===== WEBHOOK HIT =====");
  console.log(JSON.stringify(req.body, null, 2));
  try {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (value?.messages) {
      const message = value.messages[0];
      const from = message.from;
      const text = message.text?.body;

      console.log("Message:", text);

      if (text) {
        const aiReply = await generateReply(text);
        await sendWhatsAppMessage(from, aiReply);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});