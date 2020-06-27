const appController = require('../controllers/app');
const { ensureAuthenticated } = require('../config/auth');

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

    // Update(Edit) route
    app.get('/app/my-itineraries/edit/:id', ensureAuthenticated, appController.renderEdit);

    // Show route
    app.get('/app/my-itineraries/:id', ensureAuthenticated, appController.getOneById);

    /* ======================== Action Routes ===================== */
    // Post route
    app.post('/app/my-itineraries', ensureAuthenticated, appController.create);

    // Put route
    app.put('/app/my-itineraries/edit/:id', ensureAuthenticated, appController.update);

    // Delete route
    app.delete('/app/my-itineraries/:id', ensureAuthenticated, appController.delete);
};