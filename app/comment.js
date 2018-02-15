// app/comment.js
module.exports = (db) => {
  return {
    postComment: (projectId, comment, user, cb) => {
      // Get the project
      db.model.Project.findOne({ projectId: projectId}, (err, project) => {
        // Add a comment
        var comment = new db.model.Comment({
          comment: comment,
          projectId: projectId,
          staffID: user.staffID
        });
        comment.save();
        cb();
      });
    }
    getComments: (projectId, user, cb) => {
      db.model.Comment.find({ projectId: projectId }, (err, comments) => {
        if (err) cb(err);
        cb(null, comments);
      });
    }
  }
};
