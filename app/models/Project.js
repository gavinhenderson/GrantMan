var mongoose = require("mongoose");

// Project.js - Project Schema
var Schema = mongoose.Schema;

module.exports = new Schema({
	projectId: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	author: {type: Number, required: true},
	statusMessage: {type: String, required: false},
	statuses: [
		{
			editor: {type: Number}, // Dean set the project status to Researcher ammendement required
			timestamp: {type: Date, default: Date.now},
			statusMessage: {
				type: String,
				enum: ['RIS approval', 'Researcher amendment', 'Researcher approval', 'Dean approval', 'Associate Dean approval', 'Project complete']
			},
			comment: {type: String}
		}
	]
});
