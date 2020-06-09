const controller = require('./controllers/controller')

module.exports = app => {
    /* ======================== Get Routes ======================== */
    // Index route
    app.get('/', controller.index);

    // New route
    app.get('/new', controller.createPage)

    // My itinerary route
    app.get('/my-itinerary', controller.showAllItineraries)

    /* ======================== Action Routes ======================== */
    // Post route
    app.post('/my-itinerary', controller.create)
};