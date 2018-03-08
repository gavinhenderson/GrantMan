module.exports = (app,project,subscribe) => {

  //Changes the status of the project
  app.post("/project/:id/status", (req, res) => {
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

		require("./../password.js").verifyHash(req.body.password, req.user.password, (err,result) => {
			if(!err && result){
				if (!req.body.action) { res.send("Error: A new status is required"); return; }
				var action = actions[req.body.previousMessage][req.body.action];
    		project.updateStatus(action, req.body.comment, req.params.id, req.user, (err, nStatus) => {
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

						subscribe.notify(req.params.id, err=>{
							if(err) console.log(err);
						})
						res.redirect("/project/" + req.params.id);


					});
    		});
			} else {
				res.send("Password invalid");
			}
		});
	});
}
