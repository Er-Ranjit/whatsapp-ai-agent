const express = require("express");
require("dotenv").config();

const { generateReply } = require("./services/openaiService");
const { sendWhatsAppMessage } = require("./services/whatsappService");

const app = express();

app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.send("WhatsApp AI Bot Running...");
});

// =======================
// Webhook Verification
// =======================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("✅ Webhook Verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// =======================
// Incoming Messages
// =======================
app.post("/webhook", async (req, res) => {
  console.log("===== WEBHOOK HIT =====");
  console.log(JSON.stringify(req.body, null, 2));

  try {
    // Invalid body
    if (!req.body || !req.body.entry) {
      console.log("⚠ Invalid webhook payload");
      return res.sendStatus(200);
    }

    const value =
      req.body.entry?.[0]?.changes?.[0]?.value;

    if (!value) {
      console.log("⚠ No value found");
      return res.sendStatus(200);
    }

    // Ignore status updates
    if (value.statuses) {
      console.log("📩 Status Update");
      return res.sendStatus(200);
    }

    // Ignore if no message
    if (!value.messages) {
      console.log("⚠ No messages");
      return res.sendStatus(200);
    }

    const message = value.messages[0];
    const from = message.from;
    const text = message.text?.body || "";

    console.log("👤 From:", from);
    console.log("💬 Message:", text);

    if (!text) {
      return res.sendStatus(200);
    }

    // AI Reply
    const aiReply = await generateReply(text);

    console.log("🤖 Reply:", aiReply);

    await sendWhatsAppMessage(from, aiReply);

    return res.sendStatus(200);

  } catch (err) {
    console.error("Webhook Error:", err);
    return res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});