module.exports = {
    generateRandomNum (num) {
        return Math.floor(Math.random() * num);
    },
    renderRandomQuote (quotes) {
        return quotes[Math.floor(Math.random() * quotes.length)];
    },
    generateCountriesArray (countries) {
        let arr = [];
        Object.keys(countries).forEach(country => {         
            arr.push(countries[country].name);          
        })
        return arr;
    }
}