// app/project.js
module.exports = (db) => {
	return {
		getProjects: (user, cb) => {
			// Check if user exists
			db.model.User.findOne({ staffID: user.staffID }, (err, usr) => {
				if (err) return cb(err);
				if (usr === null) return cb(new Error("User does not exist"));

				if (user.type == "Researcher") {
					db.model.Project.find({ author: user.staffID }, (err, projects) => {
						if (err) return cb(err);
						cb(null, projects);
					});
				} else {
					db.model.Project.find({}, (err, projects) => {
						if (err) return cb(err);
						cb(null, projects);
					});
				}
			});
		},
		updateStatus: (action, projectId, user, cb) => {
			if (user.type == "Researcher" && (action == "Completed" || action == "Rejected")) {
				return cb(new Error("Researchers cannot complete or reject projects"));
			}

			db.model.Project.findOne({ projectId: projectId })
				.populate("status")
				.exec((err, project) => {
					if (err) return cb(err);
					var nStatus = new db.model.ProjectStatus({
						action: action,
						staffID: user.staffID,
						project: project._id,
					}).save(err => {
						if (err) return cb(err);
						if (project.status != undefined)
							project.status = nStatus._id;
						cb();
					});
				});
		},
	};
};
