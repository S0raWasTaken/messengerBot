const Client = require("./client");

class Message extends Client {
    /**
     * 
     * @param {JSON} sender the message sender info
     * @param {JSON} recipient the message recipient info
     * @param {Number} timestamp timestamp when message was sent
     * @param {String} mid message id
     * @param {String} content message content
     */
    constructor(sender, recipient, timestamp, mid, content) {
        super();
        this.author = sender;
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
        return this.sendMessage(content, this.author.id);
    }
}

module.exports = Message;
