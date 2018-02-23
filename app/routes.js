var mockProjects = require("./mockdata/projects.js");

var project = require("./project.js");
var saveFile = require("./files.js");

// app/routes.js
module.exports = (app, passport, db) => {

	project = project(db);

	// Home page =================================================================
	app.get("/",
		(req, res) => {
			console.log(req.user);
			if (req.user) {
				project.getProjects(req.user, (err, projects) => {
					if (err) { res.send(err); return; }
					// Render the index
					var data = {
						user: req.user,
						projects: projects
					};
					res.render("index", data);
				});
			} else {
				// Redirect to login
				res.redirect("/login");
			}
		});

	// ###########################################################################
	// PROJECTS
	// ###########################################################################

	// Get projects ==============================================================
	app.get("/project", (req, res) => {
		project.getProjects(req.user, (err, projects) => {
			if (err) res.send(err);
			res.send(projects);
		});
	});

	// Project page ==============================================================
	app.get("/project/:id", (req, res) => {
		// /public/files/[id]/[projec title hash]/brief.doc
		// /public/files/[id]/[projec title hash]/spreadsheet.xls
		project.getProject(req.params.id, (err, proj) => {
			if (err) { res.send(err); return; }
			res.render("project", { user: req.user, project: proj });
		});
	});

	// Status ====================================================================
	app.post("/project/:id/status", (req, res) => {
		console.log("req.body");
		console.log(req.body);
		var actions = {
			"Researcher amendment": {
				"accept": "RIS approval",
				"reject": "Researcher amendment"
			},
			"Researcher approval": {
				"accept": "Associate Dean approval",
				"reject": "RIS approval"
			},
			"RIS approval": {
				"accept":"Researcher approval",
				"reject": "Researcher amendment"
			},
			"Associate Dean approval": {
				"accept":"Dean approval",
				"reject":"Researcher amendment"
			},
			"Dean approval": {
				"accept":"Project approved",
				"reject":"Researcher amendment"
			}
		};

		require("./password.js").verifyHash(req.body.password, req.user.password, (err,result) => {
			if(!err && result){
				if (!req.body.action) { res.send("Error: A new status is required"); return; }
				var action = actions[req.body.previousMessage][req.body.action];
    		project.updateStatus(action, req.body.comment, req.params.id, req.user, (err) => {
    			if (err) { res.send(err); return; }

					db.model.Project.findOne({ projectId: req.params.id }, (err, proj) => {
						if (err) { res.send(err); return; }

						// Update the spreadsheet

						if (req.files != null) {
							if (req.files.spreadsheet) {
								saveFile("spreadsheet.xls", req.files.spreadsheet, proj._id, (err) => {
									if (err) console.log(err);
								});
							}

							// Update brief
							if (req.files.brief) {
								saveFile("brief.doc", req.files.brief, proj._id, (err) => {
									if (err) console.log(err);
								});
							}
						}

						res.redirect("/project/" + req.params.id);

					});
    		});
			} else {
				res.send("Password invalid");
			}
		});
	});


	// ###########################################################################
	// AUTHENTICATION
	// ###########################################################################

	// Login page ================================================================
	app.get("/login", (req, res) => {
		res.render("login", {message: req.flash("error")});
	});

	app.post("/login", passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: "Invalid username or password."
	}));

	// Create account ===========================================================
	app.get("/createaccount", (req, res) => {
		res.render("createaccount",{user:req.user});
	});

	app.post("/createaccount", (req,res) => {
		require("./account.js").createUser(db, req.body, (err) => {
			if (err) { res.send(err); return; }
			res.redirect("/");
		});
	});

	// Create project ============================================================
	app.get("/createproject", (req,res) => {
		res.render("createproject",{user:req.user});
	});

	app.post("/createproject",(req,res) => {
		project.createProject(req.user, req.body.title, req.body.description, function(newProject){
			newProject.save((err) => {

				project.updateStatus("RIS approval", null, newProject.projectId, req.user, (err) => {
					if(err) console.log(err);
					saveFile("spreadsheet.xls",req.files.spreadsheet,newProject._id,console.log);
					saveFile("brief.doc",req.files.brief,newProject._id,console.log);
					res.redirect("/project/"+newProject.projectId);
				});
			});
		});
	});

	// Logout ====================================================================
	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/login");
	});

};
