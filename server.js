const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const { generateReply } = require("./services/openaiService");
const { sendWhatsAppMessage } = require("./services/whatsappService");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("WhatsApp AI Bot Running smoothly...");
});

// Meta Webhook Verification Route
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
        console.log("✅ Webhook Verified successfully with Meta!");
        return res.status(200).send(challenge);
    }
    res.sendStatus(403);
});

// Incoming Message Route
app.post("/webhook", async (req, res) => {
    try {
        const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

        // Sirf text messages process karne ke liye
        if (!message || message.type !== "text") {
            return res.sendStatus(200);
        }

        const from = message.from;
        const text = message.text.body;

        // Step 1: AI reply generate karein
        const reply = await generateReply(text);

        // Step 2: User ko WhatsApp message bhejien
        await sendWhatsAppMessage(from, reply);

        res.sendStatus(200);
    } catch (err) {
        console.log("🔥 Critical Server Error:", err.message);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
});
