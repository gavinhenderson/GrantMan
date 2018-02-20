var mockProjects = require("./mockdata/projects.js");

var project = require("./project.js");

// app/routes.js
module.exports = (app, passport, db) => {

	project = project(db);
	comment = comment(db);

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
		//res.send("You clicked on project: "+req.params.id);
	});

	// Status ====================================================================
	app.post("/project/:id/status", (req, res) => {
		if (!req.body.action) { res.send("Error: A new status is required"); return; }
		project.updateStatus(req.body.action, req.body.comment, req.params.id, req.user, (err) => {
			if (err) { res.send(err); return; }
			res.redirect("/project/" + req.params.id);
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
		require("./account.js").createUser(db, req.body, function(user){
			user.save();
		});
		res.send("Account created");
	});

	// Create project ============================================================
	app.get("/createproject", (req,res) => {
		res.render("createproject",{user:req.user});
	});

	app.post("/createproject",(req,res) => {
		res.send(req.body);
	});

	// Logout ====================================================================
	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/login");
	});

};
