const mongoose = require("mongoose");
const db = require("./app/database.js")(mongoose);
const fs = require("fs");

const pw = require("./app/password.js");
const pj = require("./app/project.js")(db);

// Remove prior ================================================================
if (process.argv[2] == "--drop" || process.argv[2] == "-d") {
	db.model.User.remove({}, () => {});
	db.model.Project.remove({}, () => {});
	db.model.ProjectStatus.remove({}, () => {});

	//Remove folders
	//Taken from a stack stackoverflow
	//https://stackoverflow.com/questions/27072866/how-to-remove-all-files-from-directory-without-removing-directory-in-node-js
	//const directory = 'public/files';

	/*fs.readdir(directory, (err, files) => {
	  if (err) throw err;
	  for(const folder of files) {
			//Taken from stack stackoverflow
			//https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
	    fs.readdirSync(directory+"/"+folder).forEach(function(file, index){
	      var curPath = directory +"/" + folder + "/" + file;
	    	fs.unlinkSync(curPath); // delete file
	    });
	    fs.rmdirSync(directory+"/"+folder); //delete dir
		}
	});*/
}

// Users =======================================================================
var u1, u2, u3, i = 0;
console.log("Populating users");
pw.generateHash("password", (err, hash) => { // RIS
	u1 = db.model.User({
		staffID: 1,
		password: hash,
		email: "ris@dundee.ac.uk",
		type: "RIS",
		name: "Fred Gregington",
		school: "School of Science and Engineering"
	});
	u1.save(err => makeProjects(i++));
});
pw.generateHash("password", (err, hash) => { // Dean
	u2 = new db.model.User({
		staffID: 2,
		password: hash,
		email: "dean@dundee.ac.uk",
		type: "Dean",
		name: "Professor Iain Stewart",
		school: "School of Science and Engineering"
	});
	u2.save(err => makeProjects(i++));
});
pw.generateHash("password", (err, hash) => { // Researcher
	u3 = new db.model.User({
		staffID: 3,
		password: hash,
		email: "researcher@dundee.ac.uk",
		type: "Researcher",
		name: "Greg Fredington",
		school: "School of Science and Engineering"
	});
	u3.save(err => makeProjects(i++));
});
pw.generateHash("password", (err, hash) => { // Dean
	new db.model.User({
		staffID: 4,
		password: hash,
		email: "adean@dundee.ac.uk",
		type: "Associate Dean",
		name: "Professor Stewart Iain",
		school: "School of Science and Engineering"
	}).save();
});

// Projects ====================================================================
function makeProjects(i) {
	if (i < 2) return;

	console.log("Populating projects");

	var setStatus = id => {
		pj.updateStatus("RIS approval", null, id, u3, (err) => {
			if (err) console.log(err);
			else console.log("Set status of project " + id);
		});
	}

	var p1, p2, p3;
	p1 = new db.model.Project({ // Project 1
		projectId: 1,
		title: "Project 1",
		description: "Description for project 1",
		author: u3._id
	});
	p1.save((err) => setStatus(1));
	p2 = new db.model.Project({ // Project 2
		projectId: 2,
		title: "Project 2",
		description: "Description for project 2",
		author: u3._id
	});
	p2.save((err) => setStatus(2));
	p3 = new db.model.Project({ // Project 3
		projectId: 3,
		title: "Project 3",
		description: "Description for project 3",
		author: u3._id
	});
	p3.save((err) => setStatus(3));
}

// Close DB after 5 seconds
setTimeout(() => { process.exit(0); }, 5000);
