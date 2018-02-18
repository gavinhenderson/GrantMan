const mongoose = require("mongoose");
const db = require("./app/database.js")(mongoose);

const pw = require("./app/password.js");

// Remove prior ================================================================
if (process.argv[2] == "--drop" || process.argv[2] == "-d") {
	db.model.User.remove({}, () => {});
	db.model.Project.remove({}, () => {});
	db.model.ProjectStatus.remove({}, () => {});
	db.model.Comment.remove({}, () => {});
}

// Users =======================================================================
pw.generateHash("password", (err, hash) => { // RIS
	db.model.User({
		staffID: 1,
		password: hash,
		email: "ris@dundee.ac.uk",
		type: "RIS",
		name: "Fred Gregington",
		school: "School of Science and Engineering"
	}).save();
});
pw.generateHash("password", (err, hash) => { // Dean
	new db.model.User({
		staffID: 2,
		password: hash,
		email: "dean@dundee.ac.uk",
		type: "Dean",
		name: "Professor Iain Stewart",
		school: "School of Science and Engineering"
	}).save();
});
pw.generateHash("password", (err, hash) => { // Researcher
	new db.model.User({
		staffID: 3,
		password: hash,
		email: "researcher@dundee.ac.uk",
		type: "Researcher",
		name: "Greg Fredington",
		school: "School of Science and Engineering"
	}).save();
});

// Projects ====================================================================
new db.model.Project({ // Project 1
	projectId: 1,
	title: "Project 1",
	description: "Description for project 1",
	author: 3
}).save();
new db.model.Project({ // Project 2
	projectId: 1,
	title: "Project 2",
	description: "Description for project 2",
	author: 3
}).save();
new db.model.Project({ // Project 3
	projectId: 1,
	title: "Project 3",
	description: "Description for project 3",
	author: 3
}).save();

// Comments ====================================================================
new db.model.Comment({ // Researcher comment
	comment: "Hello this is a comment",
	projectId: 1,
	staffID: 3,
}).save();
new db.model.Comment({ // RIS comment
	comment: "This is another comment",
	projectId: 1,
	staffID: 1,
}).save();
new db.model.Comment({ // Dean comment
	comment: "Approved!",
	projectId: 1,
	staffID: 2,
}).save();

setTimeout(() => { process.exit(0); }, 5000);
