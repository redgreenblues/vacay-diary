const controller = require('./controllers/controller')

module.exports = app => {
    /* ======================== Get Routes ======================== */
    // Landing route
    app.get('/', controller.landing);
    
    // Index route
    app.get('/my-itineraries', controller.index);

    // New route
    app.get('/new', controller.newItinerary);

    // Show route
    app.get('/my-itineraries/:destination', controller.showItinerary);

    // Edit route
    app.get('/my-itineraries/:destination');

    // Registration route
    app.get('/register', controller.register);

    // Login route
    app.get('/login', controller.login);

    /* ======================== Action Routes ======================== */
    // Post route
    app.post('/my-itineraries');

    // Registration Post route
    app.post('/register');
};