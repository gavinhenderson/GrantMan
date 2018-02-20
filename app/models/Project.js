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
	status: {type: Schema.ObjectId, ref: "ProjectStatus"},
	statuses: [{type: Schema.ObjectId, ref: "ProjectStatus"}]
});
