const usersController = require('../controllers/users');

module.exports = app => {
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