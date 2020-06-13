const itineraries = require('../models/db/itineraries.model');
const users = require('../models/db/users.model');
const moment = require('moment');

module.exports = {
    landing(req, res) {
        res.render('landing.ejs')
    },
    newItinerary(req, res) {
        res.render('new.ejs');
    },
    async index(req, res) {
        try {
            const itinerary = await itineraries.find({});
            res.render('index.ejs', {
                itinerary
            })
        } catch (err) {
            res.send(err.message)
        }
    },
    async create(req, res) {
        try {
            const { destination, dateFrom, dateTo, description, plans } = await req.body;
            const newItinerary = new itineraries({ destination, dateFrom, dateTo, description, plans });        
            const result = await newItinerary.save();
            res.redirect('/my-itineraries');
        } catch (err) {
            res.send(err.message);
            res.redirect('/my-itineraries');    
        }
    },
    async showItinerary(req, res) {
        try {
            const itinerary = await itineraries.findOne({ destination: req.params.destination });
            const newDateFrom = moment(itinerary.dateFrom).format('ddd, MMM Do YYYY');
            const newDateTo = moment(itinerary.dateTo).format('ddd, MMM Do YYYY');
            res.render('show-itinerary.ejs', { itinerary, newDateFrom, newDateTo })
        } catch (err) {
            res.send(err.message)
        }
    },
    register(req, res) {
        res.render('registration.ejs')
    },
    login(req, res) {
        res.render('login.ejs')
    },
}