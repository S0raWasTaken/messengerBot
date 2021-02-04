require("dotenv").config();
const client = require(".");

client.on("ready", () => {
    console.log("READY");
})

client.on("message", message => {
    console.log(message);
});