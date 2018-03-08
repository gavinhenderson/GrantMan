var mockProjects = require("./../mockdata/projects.js");

var project = require("./../project.js");
var saveFile = require("./../files.js");
var subscribe = require("./../subscribe.js");
var mailServer = require("./../mailServer.js");

// app/routes.js
module.exports = (app, passport, db, mail) => {
	project = project(db);
	mailServer = mailServer(mail);
	subscribe = subscribe(db, mailServer);

	//Load routes
	require('./project.js')(app, project, saveFile);
	require('./status.js')(app, project, subscribe);
	require('./user.js')(app, project, passport);
};
