require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());
const Message = require("./message");
const Client = require("./client");
const client = new Client();
const {date} = require("./handler");

app.listen(process.env.PORT);
app.post("/webhook", (req, res) => {
    const body = req.body;
    if (body.object === "page") {
        body.entry.forEach(entry => {
            const rawMessage = entry.messaging[0];
            const message = new Message(
                rawMessage.sender,
                rawMessage.recipient,
                rawMessage.timestamp,
                rawMessage.message.mid,
                rawMessage.message.text
            );
            client.emit("message", message);
        });
        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
});

app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    var mode = req.query["hub.mode"];
    var token = req.query["hub.verify_token"];
    var challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            client.emit("ready");
            res.status(200).send(challenge);
        }
    } else {
        res.sendStatus(403);
    }
});
console.log("[INFO: "+date+"] Websocket started");
console.log("[INFO: "+date+"] Awaiting for API response");

module.exports = client;
