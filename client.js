const {EventEmitter} = require("events");
const childProcess = require("child_process");
const {date} = require("./handler");

class Client extends EventEmitter {
    constructor() {
        super();
        this.PAGE_ACCESS_TOKEN = "";
    }

    /**
     * @param {String} token
     * Needs to be a valid page access token
     */
    login(token) {
        this.PAGE_ACCESS_TOKEN = token;
    }

    /**
     * @param {String} message 
     * the message String to be sent
     * @param {String} messaging_type 
     * the message type {RESPONSE, UPDATE, MESSAGE_TAG}
     * @param {any} psid 
     * Person ID to send the message
     */
    sendMessage(message, messaging_type, psid) {
        if (this.PAGE_ACCESS_TOKEN.length < 1) {
            return console.error("[ERROR: "+date+"] INVALID_PAGE_ACCESS_TOKEN");
        }
        if (isNaN(parseInt(psid))) {
            return console.error("INVALID_PSID");
        }
        const messageTypes = ["RESPONSE", "UPDATE", "MESSAGE_TAG"];

        if (message.length < 1) {
            return console.error("[ERROR: "+date+"] MESSAGE_TOO_SHORT");
        }
        if (!messageTypes.find(type => type === messaging_type)) {
            return console.error("[ERROR: "+date+"]INVALID_MESSAGE_TYPE");
        }
        const api = `https://graph.facebook.com/v9.0/me/messages?access_token=${this.PAGE_ACCESS_TOKEN}`;

        const APIresponse = childProcess.exec(`curl -X POST -H "Content-type: application/json" -d '{\
            "recipient": {"id":"${psid}"}, "message":{"text":"${message}"},\
            }' "${api}"`, (error, stdout) => {
            if (error) 
                return console.error("[ERROR: "+date+"] "+error.message+"\n"+error.stack);
            if (stdout) 
                return stdout;
        });
        return APIresponse;
    }
}

module.exports = Client;
