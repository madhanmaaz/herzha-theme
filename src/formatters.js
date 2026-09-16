// One formatter per adapter output extension (`exports.ext` in adapter files).
// Each formatter receives the raw rendered value and must return a string.
function justString(content) {
    return content;
}

function json(content) {
    return JSON.stringify(content, null, 4);
}

module.exports = {
    colorscheme: justString,
    tmTheme: justString,
    json,
};
