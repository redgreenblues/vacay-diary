const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://charkuaytiao:TB198937@cluster0-etkox.mongodb.net/holiday?retryWrites=true&w=majority' || 'mongodb://localhost/' + 'holiday'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connection
.once('open', () => {
    console.log('Connected to Mongo: ' + MONGODB_URI);
}).on('error', err => {
    console.log(err.message + ' is Mongo not running?')
})