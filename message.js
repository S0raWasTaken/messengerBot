const Client = require("./client");

class Message extends Client {
    /**
     * @param {String} psid - The sender ID
     * @param {String} page_id - Thepage ID
     * @param {Number} timestamp - The message timestamp
     * @param {String} mid - The message ID
     * @param {String} content - The message content
     * @returns The message object
     */
    constructor(sender, recipient, timestamp, mid, content) {
        super();
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.mid = mid;
        this.timestamp = timestamp;
    }
    /**
     * @param {String} content
     * @returns {JSON}
     */
    reply(content) {
        return this.sendMessage(content, "RESPONSE", this.sender.id);
    }
}

module.exports = Message;
