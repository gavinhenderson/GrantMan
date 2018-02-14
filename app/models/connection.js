var mongoose = require('mongoose');

// Connect to the local mongodb instance
mongoose.connect('mongodb://localhost/grant');

// Hold an instance of that connection to make available
var db = mongoose.connection;

module.exports = db;

// Close database connection
db.close();