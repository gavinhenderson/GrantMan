var mongoose = require('mongoose');

// Project.js - Project Schema
var Schema = mongoose.Schema;

module.exports = new Schema({
	projectId: {
		type: Number,
		required: true
	}
	staff: {
		type: Array,
		required: true
	},
	fileHash: {
		type: String,
		required: true
	},
	iteration: {
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
	statuses: [{type: Number,}],
	comments:[{type: Number}]
});
