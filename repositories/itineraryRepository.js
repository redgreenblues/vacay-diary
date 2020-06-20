const Itineraries = require('../models/schema/itineraries.model');
const { findByIdAndUpdate, findByIdAndDelete } = require('../models/schema/itineraries.model');

module.exports = {
    async find (reqEmail) {
        try {
            return await Itineraries.find({ email: reqEmail });
        } catch (err) {
            throw new Error('Can\'t find data in database' + err.message);
        }
    },
    async findById (reqId) {
        try {
            return await Itineraries.findById(reqId);
        } catch (err) {
            throw new Error('Can\'t find this destination in database' + err.message);
        }
    },
    async findByIdAndUpdate (reqId, itinerary) {
        try {
            return await Itineraries.findByIdAndUpdate(reqId, itinerary);
        } catch (err) {
            throw new Error('Fail to update document' + err.message);
        }
    },
    async findByIdAndDelete (reqId) {
        try {
            return await Itineraries.findByIdAndDelete(reqId);
        } catch (err) {
            throw new Error('Fail to delete document' + err.message);
        }
    }
}