const express = require('express');
require('./models/connection');
const app = express();
const PORT = process.env.PORT || 3000;
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Set multiple views directory
app.set('views', [__dirname + '/views', __dirname + '/views/index', __dirname + '/views/new', __dirname + '/views/show', __dirname + '/views/app']);

// Static middleware
app.use(express.static('public'));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session middleware
app.use(
    session({
      secret: process.env.SECRET || 'holidayvacaydiary123abc',
      resave: false,
      saveUninitialized: false
    })
);

// Passport middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

require('./routes')(app);

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});