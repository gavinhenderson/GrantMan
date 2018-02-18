// user.js - User schema
module.exports = new require("mongoose").Schema({
	staffID: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	school: {
		type: String,
		required: true
	}
});
