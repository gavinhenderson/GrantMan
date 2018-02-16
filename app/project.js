// app/project.js
module.exports = (db) => {
  return {
    getProjects: (user, cb) => {
      // Check if user exists
      db.model.User.findOne({ staffID: user.staffID }, (err, usr) => {
        if (err) cb(err);
        if (usr == null) cb(new Error("User does not exist"));
        if (user.type == "Researcher") {
          db.model.Project.find({ author: user.staffID }, (err, projects) => {
            if (err) cb(err);
            cb(null, projects);
          });
        } else {
          db.model.Project.find({}, (err, projects) => {
            if (err) cb(err);
            cb(null, projects);
          });
        }
      });
    }
  }
};
