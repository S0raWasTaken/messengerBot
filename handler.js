const colors = require("colors");
const db = require("mariadb").createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

exports.date = () => { return new Date().toISOString().split(".")[0].split(/T+/g)[1]; }

var arg = [""];
/**
 * @param {ObjectConstructor} message 
 * @param {Array<String>} args 
 */
exports.analyze = (message, args) => {
    arg = args;
    args = args.join(" ")
        .replace("á", "a")
        .replace("à", "a")
        .replace("é", "e")
        .replace("è", "e")
        .replace("ã", "a")
        .replace("õ", "o")
        .replace("ú", "u")
        .replace("í", "i");

    console.log("[INFO: "+this.date()+"] Now analyzing the message...");
    if (look("ainda")) {
        if (look("disponível") || look("disponivel")) {
            const disponIndex = args.indexOf("disponivel") || args.indexOf("disponível");
            const aindaIndex = args.indexOf("ainda");
            if (disponIndex < aindaIndex) {
                console.log(`[INFO: ${this.date()}] This message needs analysis:\
                \nContent: ${message.content}\
                \nAuthorID: ${message.author.id}\
                \nPlease, follow the syntax: ${"{AuthorID} [Reply]".cyan}`.green);
            } else {
                const serverReply = message.reply("Testado");
                console.log(serverReply);
            }
        }
    }
}

exports.checkDB = () => {

}; //TODO

/**
 * @param {String} index 
 */
function look(index) {
    return arg.find(a => a == index);
}