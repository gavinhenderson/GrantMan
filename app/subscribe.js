module.exports = (db, mailServer) => {
  return {
    getSubscribers: (projectId, cb) => {
      db.model.Project.findOne({ _id: projectId })
        .populate({
          path: "subscribers",
          select: "name _id type email"
        })
        .exec((err, project) => {
          if (err) return cb(err, null);
          if(!project){ cb("Invalid id"); return; }
          cb(null, project.subscribers);
        });
    },
    addSubscriber: (projectId, userId, cb) => {
      db.model.Project.findOne( { _id : projectId }, (err,project)=>{
        if(err) cb(err);
        if(!project){ cb("Invalid id"); return; }
        project.subscribers.push(userId);
        project.save(err,project=>{
          if(err) cb(err);
          else{
            cb();
          }
        })
      })
    },
    removeSubscriber: (projectId, userId, cb) => {
      db.model.Project.findOne( { _id: projectId }, (err,project)=>{
        if(!project){ cb("Invalid id"); return; }
        if(err) cb(err);
        var index = project.subscribers.indexOf(userId);
        if(index>-1){
          project.subscribers.splice(index, 1);
        }else{
          err("Invalid id")
        }
        project.save(err,project=>{
          if(err) cb(err);
          else cb();
        })
      })
    },
    notify: (projectId, cb)=>{
      db.model.Project.findOne( { projectId: projectId })
        .populate({
          path: "subscribers",
          select: "_id name type email"
        })
        .populate({
          path: "statuses",
          populate: {
            path: "editor",
            select: "name type"
          }
        })
        .populate({
          path: "status",
          populate: {
            path: "editor",
            select: "name type"
          }
        })
        .populate({
          path: "author",
          select: "name type school"
        })
        .exec((err,project)=>{
          if(err){ cb(err); return; }
          project.subscribers.forEach(current=>{
            mailServer.sendEmail("Status Change", current.email, "statusChange", {
              'project': project,
              'user': current
            }, cb);
          })
        })
    }
  }
}
