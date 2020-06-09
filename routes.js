const controller = require('./controllers/controller')

module.exports = app => {
    /* ======================== Get Routes ======================== */
    // Index route
    app.get('/', controller.index);

    // New route
    app.get('/new', controller.createPage)

    // My itineraries route
    app.get('/my-itineraries', controller.showAllItineraries)

    // Show individual itinerary route
    app.get('/my-itineraries/:destination', controller.showItinerary)

    /* ======================== Action Routes ======================== */
    // Post route
    app.post('/my-itineraries', controller.create)
};