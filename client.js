const {EventEmitter} = require("events");
const childProcess = require("child_process");
const {date} = require("./handler");

class Client extends EventEmitter {
    constructor() {
        super();
        this.PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    }

    /**
     * @param {String} message 
     * the message String to be sent
     * @param {String} messaging_type 
     * the message type {RESPONSE, UPDATE, MESSAGE_TAG}
     * @param {any} psid 
     * Person ID to send the message
     */
    sendMessage(message, psid) {
        const messaging_type = "RESPONSE";
        if (this.PAGE_ACCESS_TOKEN.length < 1) {
            return console.error("[ERROR: "+date()+"] INVALID_PAGE_ACCESS_TOKEN");
        }
        //if (isNaN(parseInt(psid))) {
        //    return console.error("INVALID_PSID");
        //}
        if (message.length < 1) {
            return console.error("[ERROR: "+date()+"] MESSAGE_TOO_SHORT");
        }
        // Changed to my test app in localhost
        const api = /*`https://graph.facebook.com/v9.0/me/messages?access_token=${this.PAGE_ACCESS_TOKEN}`*/ "localhost:25576/test";

        const APIresponse = send(psid, message, api);
        return APIresponse;
    }
}
/**
 * @param {any} psid
 * @param {String} message 
 * @param {URL} api 
 */
function send(psid, message, api) {
        var response;
        childProcess.exec(`curl -X POST -H "Content-type: application/json" -d '{"recipient": {"id":"${psid}"}, "message":{"text":"${message}"} }' "${api}"`, 
            (error, stdout) => {
                if (error) 
                    return console.error("[ERROR: "+date()+"] "+error.message+"\n"+error.stack);
                if (stdout) {
                    response = stdout;
                    return stdout;
                }   
            }
        );
        return response;
}
module.exports = Client;
