const itineraries = require('../models/db/itineraries.model')

module.exports = {
    index (req, res) {
        res.render('index.ejs')
    },
    createPage (req, res) {
        res.render('new.ejs');
    },
    async showAllItineraries (req, res) {
        try {
            const itinerary = await itineraries.find({});
            res.render('my-itinerary.ejs', {
                itinerary
            })
        } catch (err) {
            res.send(err.message)
        }
    },
    async create (req, res) {
        try {
            const { destination, dateFrom, dateTo, description, plans, image } = await req.body;
            const newItinerary = new itineraries ({ destination, dateFrom, dateTo, description, plans, image });
            const result = await newItinerary.save();
            res.redirect('/my-itinerary');
        } catch (err) {
            res.send(err.message);
            res.redirect('/my-itinerary');
        }
    }
}