// Models
const mongoose = require("mongoose");

module.exports = {
	User: mongoose.model("User", require("./User.js")),
	Project: mongoose.model("Project", require("./Project.js")),
	Comment: mongoose.model("Comment", require("./Comment.js")),
	ProjectStatus: mongoose.model("ProjectStatus", require("./ProjectStatus.js")),
};
