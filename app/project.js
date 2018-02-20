// app/project.js
const permissions = require('./permission.js');
module.exports = (db) => {
	return {
		getProjects: (user, cb) => {
			// Check if user exists
			db.model.User.findOne({ staffID: user.staffID }, (err, usr) => {
				if (err) return cb(err);
				if (usr === null) return cb(new Error("User does not exist"));

				if (user.type == "Researcher") {
					db.model.Project.find({ author: user.staffID })
						.populate("statuses")
						.populate("status")
						.exec((err, projects) => {
							cb(null, projects);
						});
				} else {
					db.model.Project.find({ })
						.populate("statuses")
						.populate("status")
						.exec((err, projects) => {
							cb(null, projects);
						});
				}
			});
		},
		updateStatus: (action, comment, projectId, user, cb) => {
			// Check status change is valid
			if (!permissions[user.type][action])
				return cb(new Error(
					"User type " + user.type + " cannot change status to " + action));

			// Get the project
			db.model.Project.findOne({ projectId: projectId }, (err, project) => {
					if (err) return cb(err);
					if (!project)
						return cb(new Error("No project exists with ID" + projectId));

					// Create the entity
					var nStatus = new db.model.ProjectStatus({
						statusMessage: action,
						editor: user.staffID,
						comment: comment,
						projectId: project.projectId,
					});
					// Save to the database
					nStatus.save(err => {
						if (err) return cb(err);
						project.status = nStatus._id;
						project.statuses.push(nStatus._id);
						project.save(err => {
							if (err) return cb(err);
							cb();
						});
					});
				});
		},
	};
};
