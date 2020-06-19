const appController = require('./controllers/appController');
const usersController = require('./controllers/users');
const { ensureAuthenticated } = require('./config/auth');

module.exports = app => {
    /* ===============================================================
                                APP ROUTES
    =============================================================== */

    /* ======================== Get Routes ======================== */
    // Landing route
    app.get('/', appController.renderHome);

    // Vacay Diary app route
    app.get('/app', ensureAuthenticated, appController.renderAppHome);
    
    // Index route
    app.get('/app/my-itineraries', ensureAuthenticated, appController.index);

    // New route
    app.get('/app/new', ensureAuthenticated, appController.newForm);

    // Show route
    app.get('/app/my-itineraries/:id', ensureAuthenticated, appController.getOneById);

    // Edit route
    app.get('/app/my-itineraries/:destination');

    /* ======================== Action Routes ===================== */
    // Post route
    app.post('/app/my-itineraries', ensureAuthenticated, appController.create);

    /* ===============================================================
                                USER ROUTES
    =============================================================== */

    /* ======================== Get Routes ======================== */
    // Registration route
    app.get('/register', usersController.register);

    // Login route
    app.get('/login', usersController.login);

    // Logout route
    app.get('/logout', usersController.logout);

    /* ======================== Action Routes ===================== */
    // Registration Post route
    app.post('/register', usersController.registerHandler);

    // Login Post route
    app.post('/login', usersController.loginHandler);
};