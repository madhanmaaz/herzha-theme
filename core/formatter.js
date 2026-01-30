function justString(content) {
    return content;
}

function json(content) {
    return JSON.stringify(content, null, 4);
}

module.exports = {
    json,
    tmTheme: justString,
};
