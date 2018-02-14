var mongoose = require('mongoose');
var db = require('./connection');

// Handle a connection error
db.on('error', console.error.bind(console, 'connection error:'));

// Set up Schema for users
var Schema = mongoose.Schema;

var userSchema = new Schema({
	staffID: 
		{
			type: Number,
			required: true
		},
	password: 
		{
			type: String,
			required: true
		},
	email: 
		{
			type: String,
			required: true
		},
	type: 
		{
			type: String,
			required: true
		},
	name: 
		{
			type: String,
			required: true
		},
	school: 
		{
			type: String,
			required: true
		}
});

var User = mongoose.model('User', userSchema);

module.exports = User;