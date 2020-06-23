const ItineraryRepository = require('../repositories/itineraryRepository');
const Itineraries = require('../models/schema/itineraries.model');
const moment = require('moment');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

module.exports = {
    renderHome(req, res) {
        res.render('home.ejs')
    },
    renderAppHome(req, res) {
        res.render('app-home.ejs', { username: req.user.firstName });
    },
    async newForm(req, res) {
        const response = await fetch('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json');
        let countries = await response.json();
        res.render('new.ejs', { 
            username: req.user.firstName,
            countries
        });
    },
    async index(req, res) {
        try {
            const response = await fetch('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json');
            let countries = await response.json();
            const itinerary = await ItineraryRepository.find(req.user.email);
            res.render('index.ejs', {
                username: req.user.firstName,
                itinerary,
                moment: moment,
                countries
            })
        } catch (err) {
            res.send(err.message)
        }
    },
    async create(req, res) {
        try {
            const { destination, dateFrom, dateTo, description, plans } = await req.body;
            const newItinerary = new Itineraries({ _id: mongoose.Types.ObjectId(), email: req.user.email, destination, dateFrom, dateTo, description, plans });
            const result = await newItinerary.save();
            res.redirect('/app/my-itineraries');
        } catch (err) {
            res.send(err.message);
        }
    },
    async getOneById(req, res) {
        try {
            const itinerary = await ItineraryRepository.findById(req.params.id);
            res.render('show-itinerary.ejs', {
                username: req.user.firstName,
                itinerary,
                moment: moment
            })
        } catch (err) {
            res.send(err.message);
        }
    },
    async renderEdit(req, res) {
        try {
            const response = await fetch('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json');
            let countries = await response.json();
            const itinerary = await ItineraryRepository.findById(req.params.id);
            res.render('edit.ejs', {
                username: req.user.firstName,
                itinerary,
                moment: moment,
                countries
            })
        } catch (err) {
            res.send(err.message);
        }
    },
    async update(req, res) {
        try {
            const itinerary = {
                destination: req.body.destination,
                dateFrom: req.body.dateFrom,
                dateTo: req.body.dateTo,
                description: req.body.description,
                plans: req.body.plans
            };
            await ItineraryRepository.findByIdAndUpdate(req.params.id, itinerary);
            res.redirect('/app/my-itineraries');
        } catch (err) {
            res.send(err.message);
        }
    },
    async delete(req, res) {
        try {
            await ItineraryRepository.findByIdAndDelete(req.params.id);
            res.redirect('/app/my-itineraries');
        } catch (err) {
            res.send(err.message);
        }
    }
}