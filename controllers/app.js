// Dependencies
const ItineraryRepository = require('../repositories/itineraryRepository');
const quotes = require('../models/db/quotes.json');
const { generateRandomNum, renderRandomQuote } = require('../public/js/util');
const fetch = require('node-fetch');
const moment = require('moment');
const ct = require('countries-and-timezones');
const countries = ct.getAllCountries();
global.fetch = fetch;
require('dotenv').config();

// Random quotes
const randomQuotes = renderRandomQuote(quotes);

// Unsplash photos
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({ accessKey: UNSPLASH_API_KEY });

// Openweather
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

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
            countries,
            randomQuotes
        });
    },
    async index(req, res) {
        try {          
            const response = await unsplash.search.photos('nature', generateRandomNum(50), 30, { orientation: 'landscape' });
            const result = await response.json();
            const photos = result.results;
            const itinerary = await ItineraryRepository.find(req.user.email);
            res.render('index.ejs', {
                username: req.user.firstName,
                itinerary,
                moment,
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
            let errors = [];

            // Validation
            if (!dateFrom || !dateTo) errors.push({ dateMsg: 'Date cannot be empty' });

            if (errors.length > 0) {
                res.render('new.ejs', {
                    username: req.user.firstName,
                    countries,
                    randomQuotes,
                    errors
                })
            } else {
                const newItinerary = ItineraryRepository.createItinerary(req.user.email, destination, dateFrom, dateTo, description, plans);
                await newItinerary.save();
                res.redirect('/app/my-itineraries');
            }          
        } catch (err) {
            res.send(err.message);
        }
    },
    async getOneById(req, res) {
        try {           
            const itinerary = await ItineraryRepository.findById(req.params.id);
            // Fetch weather from openweather API
            const fetch_response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${itinerary.destination}&appid=${OPENWEATHER_API_KEY}`);
            const response = await fetch_response.json();
            const weather = await response.weather;
            const temperature = await response.main;
            res.render('show-itinerary.ejs', {
                username: req.user.firstName,
                itinerary,
                moment,
                countries,
                ct,
                weather,
                temperature
            })
        } catch (err) {
            res.send(err.message);
        }
    },
    async renderEdit(req, res) {
        try {
            const itinerary = await ItineraryRepository.findById(req.params.id);
            const randomQuotes = renderRandomQuote(quotes);
            res.render('edit.ejs', {
                username: req.user.firstName,
                itinerary,
                moment,
                countries,
                randomQuotes
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