var mongoose = require('mongoose');

// Project.js - Project Schema
var Schema = mongoose.Schema;

var statusSchema = new Schema({
	action: {
		type: String,
		required: true
	},
	staffID: {
		type: Number,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	},
});

var CommentSchema = new Schema({
	comment: {
		type: String,
		required: true
	},
	staffID: {
		type: Number,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	},
});

var projectSchema = new Schema({
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
	status: [statusSchema],
	comment:[CommentSchema]
});

module.exports = projectSchema;