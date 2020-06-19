const controller = require('./controllers/controller');
const usersController = require('./controllers/users');

module.exports = app => {
    /* ===============================================================
                                APP ROUTES
    =============================================================== */

    /* ======================== Get Routes ======================== */
    // Landing route
    app.get('/', controller.renderHome);

    // Vacay Diary app route
    app.get('/app', controller.renderAppHome);
    
    // Index route
    app.get('/my-itineraries', controller.index);

    // New route
    app.get('/new', controller.newForm);

    // Show route
    app.get('/my-itineraries/:id', controller.getOneById);

    // Edit route
    app.get('/my-itineraries/:destination');

    /* ======================== Action Routes ===================== */
    // Post route
    app.post('/my-itineraries', controller.create);

    /* ===============================================================
                                USER ROUTES
    =============================================================== */

    /* ======================== Get Routes ======================== */
    // Registration route
    app.get('/register', usersController.register);

    // Login route
    app.get('/login', usersController.login);

    /* ======================== Action Routes ===================== */
    // Registration Post route
    app.post('/register', usersController.registerHandler);
};