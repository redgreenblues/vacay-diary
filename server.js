const express = require('express');
require('./models/connection');
const app = express();
const PORT = process.env.PORT || 3000;
const flash = require('connect-flash');
const session = require('express-session');

app.set('views', [__dirname + '/views', __dirname + '/views/index', __dirname + '/views/new', __dirname + '/views/show', __dirname + '/views/app']);

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
    session({
      secret: process.env.SECRET || 'holidayvacaydiary123abc',
      resave: false,
      saveUninitialized: false
    })
);

// Flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

require('./routes')(app);

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});