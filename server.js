const express = require('express');
require('./models/connection');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});