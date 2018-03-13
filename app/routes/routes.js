var mockProjects = require("./../mockdata/projects.js");

var project = require("./../project.js");
var saveFile = require("./../files.js");
var subscribe = require("./../subscribe.js");
var mailServer = require("./../mailServer.js");
var account = require('./../account.js');

// app/routes.js
module.exports = (app, passport, db, mail) => {
	project = project(db);
	mailServer = mailServer(mail);
	subscribe = subscribe(db, mailServer);
	account = account(db);

	//Load routes
	require('./project.js')(app, project, saveFile, subscribe);
	require('./status.js')(app, project, subscribe);
	require('./user.js')(app, project, passport, account);
};
