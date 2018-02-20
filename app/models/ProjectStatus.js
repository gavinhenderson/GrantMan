// ProjectStatus.js - Project status Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

module.exports = new Schema({
	statusMessage: {
		type: String,
		enum: [
			"RIS approval"
		, "Researcher amendment"
		, "Researcher approval"
		, "Dean approval"
		, "Associate Dean approval"
		, "Project approved"
		]
	},
	editor: {
		type: Number,
		required: true
	},
	comment: {
		type: String,
		required: false
	},
	projectId: {
		type: Number,
		required: true
	},
	timestamp: { type: Date, default: Date.now },
});
