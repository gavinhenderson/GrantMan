module.exports = (app, project, passport, account) => {

  //Webpage entry point
  app.get("/",(req, res) => {
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

  //Login Page
  app.get("/login", (req, res) => {
		res.render("login", {message: req.flash("error")});
	});

  //Login authentication
	app.post("/login", passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: "Invalid username or password."
	}));

  //Create account page
  app.get("/createaccount", (req, res) => {
		res.render("createaccount",{user:req.user});
	});

  //Create account logic
	app.post("/createaccount", (req,res) => {
		account.createUser(req.body, (err) => {
			if (err) { res.send(err); return; }
			res.redirect("/");
		});
	});

  //Log out and redirect to login
  app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/login");
	});

  // Change password page
  app.get("/changepassword", (req, res) => {
  		res.render("changepassword", {user:req.user});
  });

  // Change password logic
  app.post("/changepassword", (req, res) => {
  		account.changePassword(req.body, req.user, (err) => {
  			if (err) {res.send(err); return; }
  			res.redirect("/");
  		});

  });

}
