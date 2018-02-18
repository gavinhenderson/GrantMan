// Comment.js - Comment Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

module.exports = new Schema({
	comment: {
		type: String,
		required: true
	},
	staffID: {
		type: Number,
		required: true
	},
	projectId: {
		type: Number,
		required: true
	},
	timestamp: { type: Date, default: Date.now },
});
