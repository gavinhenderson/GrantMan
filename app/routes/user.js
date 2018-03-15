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
		
		var emails = req.body.email;
		var types = req.body.type;
		var schools = req.body.school;

		// res.send(req.body);

		for (var i = emails.length - 1; i >= 0; i--) {
			
			account.createUserWithToken(emails[i], types[i], schools[i], (err, user) => {
				if(err) console.log(err);

				user.save();

				console.log(user);

				//mail.sendEmail("New GrantMan Account", user.email, "NewAccountEmail", user, () => {});

			});

		}

		res.redirect("/");

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
