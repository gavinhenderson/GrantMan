var mongoose = require('mongoose');

// Connect to the local mongodb instance
mongoose.connect('mongodb://127.0.0.1:27017/grant');

// Hold an instance of that connection to make available
var db = mongoose.connection;

module.exports = db;

// Close database connection
db.close();