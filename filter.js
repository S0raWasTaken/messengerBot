const {readFileSync} = require("fs");
/**
 * @param {Array<String>} args
 * @return {String}
 */
exports.read = (args) => {
    const ignored = readFileSync("./.filter").toString().split(/ +/g);
    return ignored.find(i => args.find(a => a == i.toLowerCase()));
};
