const ItineraryRepository = require('../repositories/itineraryRepository');
const Itineraries = require('../models/schema/itineraries.model');
const moment = require('moment');

const dateFormatter = date => {
    return moment(date).format('ddd, MMM do YYYY');
};

module.exports = {
    renderHome(req, res) {
        res.render('home.ejs')
    },
    renderAppHome(req, res) {
        res.render('app-home.ejs', { username: req.user.firstName });
    },
    newForm(req, res) {
        res.render('new.ejs', { username: req.user.firstName });
    },
    async index(req, res) {
        try {
            const itinerary = await ItineraryRepository.find();
            const newDateFrom = dateFormatter(itinerary.dateFrom);
            const newDateTo = dateFormatter(itinerary.dateTo);
            res.render('index.ejs', {
                username: req.user.firstName,
                itinerary,
                newDateFrom,
                newDateTo
            })
        } catch (err) {
            res.send(err.message)
        }
    },
    async create(req, res) {
        try {
            const { destination, dateFrom, dateTo, description, plans } = await req.body;
            const newItinerary = new Itineraries({ _id: mongoose.Types.ObjectId(), destination, dateFrom, dateTo, description, plans });
            const result = await newItinerary.save();
            res.redirect('/my-itineraries');
        } catch (err) {
            res.send(err.message);
        }
    },
    async getOneById(req, res) {
        try {
            const itinerary = await ItineraryRepository.findById(req.params.id);
            const newDateFrom = dateFormatter(itinerary.dateFrom);
            const newDateTo = dateFormatter(itinerary.dateTo);
            res.render('show-itinerary.ejs', {
                itinerary,
                newDateFrom,
                newDateTo
            })
        } catch (err) {
            res.send(err.message)
        }
    },
}