const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get("/", (_req, res) => {
  res.status(200).send("Uniformes Kana webhook OK");
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  console.log("WhatsApp webhook recibido:", JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Webhook escuchando en el puerto ${PORT}`);
});
