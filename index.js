require("dotenv").config();
const client = require("./app");
const {date} = require("./handler");
const filter = require("./filter");
const ignored = new Set();
client.login(process.env.PAGE_ACCESS_TOKEN);

client.on("ready", () => {
    console.log("[INFO: "+date+"] Bot logged in!");
});

client.on("message", message => {
    console.log("[INFO: "+date+"] Received message from API:\n"+message.content);
    const args = message.content.trim().split(/ +/g);
    if (filter.read(args)) return ignored.add(message.author.id);

    
});
