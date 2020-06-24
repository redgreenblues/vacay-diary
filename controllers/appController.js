const ItineraryRepository = require('../repositories/itineraryRepository');
const Itineraries = require('../models/schema/itineraries.model');
const moment = require('moment');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
global.fetch = fetch;
const countries = require('../models/db/countries.json');

// Unsplash photos
const API_KEY = 'wF_pL8v5iF3fJLZCsAas0gQ2O1JmWfApr870C9onFZ4';
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({ accessKey: API_KEY });

module.exports = {
    renderHome(req, res) {
        res.render('home.ejs')
    },
    renderAppHome(req, res) {
        res.render('app-home.ejs', { username: req.user.firstName });
    },
    async newForm(req, res) {
        res.render('new.ejs', {
            username: req.user.firstName,
            countries
        });
    },
    async index(req, res) {
        try {          
            const generateRandomNum = num => {
                return Math.floor(Math.random() * num)
            }
            const response = await unsplash.search.photos('nature', generateRandomNum(50), 30, { orientation: 'landscape' });
            const result = await response.json();
            const photos = result.results;
            const itinerary = await ItineraryRepository.find(req.user.email);
            res.render('index.ejs', {
                username: req.user.firstName,
                itinerary,
                moment: moment,
                countries,
                photos,
                generateRandomNum
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
                moment: moment,
                countries
            })
        } catch (err) {
            res.send(err.message);
        }
    },
    async renderEdit(req, res) {
        try {
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
            req.flash('success_msg', 'Successful deleted')
            res.redirect('/app/my-itineraries');
        } catch (err) {
            res.send(err.message);
        }
    }
}