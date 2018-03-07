module.exports = (db) => {
  return {
    getSubscribers: (projectId, cb) => {
      db.model.Project.findOne({ projectId: projectId })
        .populate({
          path: "subscribers",
          select: "name _id type email"
        })
        .exec((err, project) => {
          if (err) return cb(err, null);
          cb(null, project.subscribers);
        });
    },
    addSubscriber: (projectId, userId, cb) => {
      cb("Not impliamented yet");
    },
    removeSubscriber: (projectId, userId, cb) => {
      cb("Not impliamented yet");
    },
  }
}
