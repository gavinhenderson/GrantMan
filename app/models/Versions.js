var mongoose = require("mongoose");

// Project.js - Project Schema
var Schema = mongoose.Schema;

module.exports = new Schema({
  Project: {
    type: Schema.ObjectId,
    ref: "Project",
    required: true
  },
  VersionNumber: {
    type: Number,
    require: true
  },
  timestamp: { type: Date, default: Date.now },
});
