require("dotenv").config();
const client = require("./app");
const {date, analyze} = require("./handler");
const filter = require("./filter");
const ignored = new Set(); // temporary

client.on("ready", () => {
    console.log("[INFO: "+date+"] Bot logged in!");
});

client.on("message", message => {
    if (ignored.has(message.author.id)) return;

    console.log("[INFO: "+date+"] Received message from API: "+message.content);
    const args = message.content.trim().toLowerCase().split(/ +/g);
    if (filter.read(args)) {
        console.log(
            "[INFO: "+date
            +"] Messages from this author will be successfully ignored in the future"
        );
        return ignored.add(message.author.id);
    }
    
    const analysis = analyze(message, args);
    
});
