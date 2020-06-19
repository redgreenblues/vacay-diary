const Itineraries = require('../models/schema/itineraries.model');

module.exports = {
    async find () {
        try {
            return await Itineraries.find({});
        } catch (err) {
            throw new Error('Can\'t find data in database' + err.message);
        }
    },
    async findById (id) {
        try {
            return await Itineraries.findById(id);
        } catch (err) {
            throw new Error('Can\'t find this destination in database' + err.message)
        }
    }
}