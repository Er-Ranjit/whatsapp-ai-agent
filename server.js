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

app.get("/webhook", (req, res) => {

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {

        console.log("Webhook Verified");

        return res.status(200).send(challenge);

    }

    res.sendStatus(403);

});

app.post("/webhook", async (req, res) => {

    try {

        console.log(JSON.stringify(req.body, null, 2));

        const message =
            req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

        if (!message || message.type !== "text") {
            return res.sendStatus(200);
        }

        const from = message.from;
        const text = message.text.body;

        console.log("From:", from);
        console.log("Message:", text);

        const reply = await generateReply(text);

        await sendWhatsAppMessage(from, reply);

        res.sendStatus(200);

    } catch (err) {

        console.log(err);

        res.sendStatus(500);

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("🚀 Server running on port", PORT);

});