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
		type: Schema.ObjectId,
		ref: "User"
	},
	comment: {
		type: String,
		required: false
	},
	project: {
		type: Schema.ObjectId,
		ref: "User"
	},
	timestamp: { type: Date, default: Date.now },
});
