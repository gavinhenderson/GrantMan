// ProjectStatus.js - Project status Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = new Schema({
	action: {
		type: String,
		required: true
	},
	staffID: {
		type: Number,
		required: true
	},
  project: {
    type: Schema.Types.ObjectId,
    required: true
  },
	timestamp: { type: Date, default: Date.now },
});
