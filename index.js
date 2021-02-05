require("dotenv").config();
const client = require(".");
const {date} = require("./handler");
client.login(process.env.PAGE_ACCESS_TOKEN);

client.on("ready", () => {
    console.log("[INFO: "+date+"] Bot logged in!");
});

client.on("message", message => {
    console.log(message);
});