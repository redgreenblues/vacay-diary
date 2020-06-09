const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema

const itinerarySchema = new Schema ({
    destination: {
        type: String,
        required: true
    },
    dateFrom: {
        type: Date,
        required: false
    },
    dateTo: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    plans: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
})

const itineraries = mongoose.model('itineraries', itinerarySchema)
module.exports = itineraries;