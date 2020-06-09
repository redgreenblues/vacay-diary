const mongoose = require('mongoose');
const Schema = mongoose.Schema

const itinerarySchema = new Schema ({
    destination: {
        type: String,
        required: true
    },
    dateFrom: {
        type: Date,
        required: [true, 'Date From is required']
    },
    dateTo: {
        type: Date,
        required: [true, 'Date To is required']
    },
    description: {
        type: String,
    },
    plans: {
        type: String,
    },
    image: {
        type: String,
    }
})

const itineraries = mongoose.model('itineraries', itinerarySchema)
module.exports = itineraries;