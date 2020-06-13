const express = require('express');
require('./models/connection');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', [__dirname + '/views', __dirname + '/views/index', __dirname + '/views/new', __dirname + '/views/show']);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});