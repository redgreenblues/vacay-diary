const User = require('../models/schema/users.model');

module.exports = {
    async findOne (email) {
        const result = await User.findOne({ email: email });
        return result;
    },
}