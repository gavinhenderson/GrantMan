module.exports = (app, project, saveFile, subscribe) => {

  //Returns all of a users projects
  app.get("/project", (req, res) => {
		project.getProjects(req.user, (err, projects) => {
			if (err) res.send(err);
			res.send(projects);
		});
	});

  //Loads project page of given project
  app.get("/project/:id", (req, res) => {
		// /public/files/[id]/[projec title hash]/brief.doc
		// /public/files/[id]/[projec title hash]/spreadsheet.xls
		project.getProject(req.params.id, (err, proj) => {
			if (err) { res.send(err); return; }
			res.render("project", { user: req.user, project: proj });
		});
	});

  //Subscribe user from the given project
  app.post("/project/:id/subscribe", (req,res)=>{
		project.getProject(req.params.id, (err, proj)=>{
			subscribe.addSubscriber(proj._id, req.user._id, (err)=>{
				if(err) console.log(err);
				res.redirect("/project/"+req.params.id);
			})
		})
	})

  //Unsubscribe user from the given project
  app.post("/project/:id/unsubscribe", (req,res)=>{
		project.getProject(req.params.id, (err, proj)=>{
			subscribe.removeSubscriber(proj._id, req.user._id, (err)=>{
				if(err) console.log(err);
				res.redirect("/project/"+req.params.id);
			})
		})
	})

  //Loads the page used to create a project
  app.get("/createproject", (req,res) => {
		res.render("createproject",{user:req.user});
	});

  //Takes the data of a new project and creates it
	app.post("/createproject",(req,res) => {
		project.createProject(req.user, req.body.title, req.body.description, function(newProject){
			newProject.save((err) => {

				project.updateStatus("RIS approval", null, newProject.projectId, req.user, (err) => {
					if(err) console.log(err);
					saveFile("spreadsheet.xls",req.files.spreadsheet,newProject._id, "1", console.log);
					saveFile("brief.doc",req.files.brief,newProject._id, "1", console.log);
					res.redirect("/project/"+newProject.projectId);
				});
			});
		});
	});
}
