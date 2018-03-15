// Models
const mongoose = require("mongoose");

module.exports = {
	User: mongoose.model("User", require("./User.js")),
	Project: mongoose.model("Project", require("./Project.js")),
	ProjectStatus: mongoose.model("ProjectStatus", require("./ProjectStatus.js"))
};
