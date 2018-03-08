const mongoose = require("mongoose");
const db = require("./app/database.js")(mongoose);
const fs = require("fs");
const cu = require('./app/account.js'); //createuser
const pw = require("./app/password.js");
const pj = require("./app/project.js")(db);

// Remove prior ================================================================
if (process.argv[2] == "--drop" || process.argv[2] == "-d") {
	db.model.User.remove({}, () => {});
	db.model.Project.remove({}, () => {});
	db.model.ProjectStatus.remove({}, () => {});
}

var i=0;

var makeUserAync = (newUser, makeProj, cb) => {
	cu.createUser(db, newUser, (err,user)=>{
		if(err) console.log(err);
		console.log(newUser.email+" has been created")
		if(makeProj) { makeProjects(cb); }
		else { cb(user._id) }
	})
}

// Users =======================================================================
u1 = {
	id: 1,
	password: "password",
	email: "ris@dundee.ac.uk",
	type: "RIS",
	name: "Fred Gregington",
	school: "School of Science and Engineering"
};


/*cu.createUser(db, u1, (err, user)=>{
	if(err) console.log(err);
	u1._id = user._id;
	makeProjects(i++)
});*/

u2 = {
	id: 2,
	password: "password",
	email: "dean@dundee.ac.uk",
	type: "Dean",
	name: "Professor Iain Stewart",
	school: "School of Science and Engineering"
};

/*
cu.createUser(db, u2, (err,user)=>{
	if(err) console.log(err);
	u2._id = user._id;
	makeProjects(i++);
})*/

u3 = {
	id: 3,
	password: "password",
	email: "researcher@dundee.ac.uk",
	type: "Researcher",
	name: "Greg Fredington",
	school: "School of Science and Engineering"
};
/*
cu.createUser(db, u3, (err,user)=>{
	if(err) console.log(err);
	u3._id = user._id;
	makeProjects(i++);
})*/

u4 = {
	id: 4,
	password: "password",
	email: "adean@dundee.ac.uk",
	type: "Associate Dean",
	name: "Professor Stewart Iain",
	school: "School of Science and Engineering"
};
/*
cu.createUser(db, u4, (err,user) => {
	if(err) console.log(err);
	u4._id = user._id;
})*/

makeUserAync(u3, false, (id)=>{
	u3._id = id;
	console.log(id)
	makeUserAync(u2, true,()=>{
		makeUserAync(u1, true, ()=>{
			makeUserAync(u4, false, ()=>{
				process.exit(0);
			})
		})
	})
})

// Projects ====================================================================
function makeProjects(cb) {
	console.log("Populating projects");

	var setStatus = (id,cb) => {
		pj.updateStatus("RIS approval", null, id, u3, (err) => {
			if (err) console.log(err);
			else console.log("Set status of project " + id);
			if(cb) cb();
		});
	};

	var p1, p2, p3;
	p1 = { // Project 1
		title: "Project 1",
		description: "Description for project 1",
	};
	p2 = { // Project 2
		title: "Project 2",
		description: "Description for project 2",
	};
	p3 = { // Project 3
		title: "Project 3",
		description: "Description for project 3",
	};

	pj.createProject(u3,p1.title,p1.description, (project)=>{
		project.save((err, proj) => {
			if(err) console.log(err)
			console.log(proj.title+ " has been created")
			setStatus(project.projectId);
			pj.createProject(u3,p2.title,p2.description, (project)=>{
				project.save((err, proj) => {
					if(err) console.log(err)
					setStatus(project.projectId);
					pj.createProject(u3,p3.title,p3.description, (project)=>{
						project.save((err, proj) => {
							if(err) console.log(err)
							setStatus(project.projectId, cb);
						});
					})
				});
			})
		});
	});
}
