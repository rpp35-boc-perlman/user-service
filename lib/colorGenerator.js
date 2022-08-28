

// should generate a random color in the form of a hex key (e.g. #ff0000)
module.exports = function colorGenerator() {
    const hex = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
}