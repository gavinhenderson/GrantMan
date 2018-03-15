// user.js - User schema
module.exports = new require("mongoose").Schema({
	staffID: {
		type: Number,
	},
	password: {
		type: String,
	},
	email: {
		type: String,
		required: true
	},
	type: {
		type: String,
		enum: ["RIS", "Researcher", "Dean", "Associate Dean"],
		required: true
	},
	name: {
		type: String,
	},
	school: {
		type: String,
		required: true
	},
	token: {
		type: String
	}
});
