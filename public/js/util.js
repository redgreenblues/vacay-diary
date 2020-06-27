module.exports = {
    generateRandomNum (num) {
        return Math.floor(Math.random() * num);
    },
    renderRandomQuote (quotes) {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
}