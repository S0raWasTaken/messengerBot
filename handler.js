exports.date = () => {
    return new Date().toISOString().split(".")[0].split(/T+/g)[1];
}