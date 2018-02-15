const mongoose = require("mongoose");
const db = require("./app/database.js")(mongoose);

// Remove prior ================================================================
if (process.argv[2] == "--drop" || process.argv[2] == "-d") {
  db.model.User.remove({});
  db.model.Project.remove({});
  db.model.ProjectStatus.remove({});
  db.model.Comment.remove({});
}

// Users =======================================================================
var count = 0;
function addUser(staffId, email, type, name) {
  require('./app/password.js').generateHash('password', (err, hash) => {
  var usr = new db.model.User({
    staffID: count++,
    password: hash,
    email: email,
    type: type,
    name: name,
    school: 'School of Science and Engineering'
  });
  usr.save();
  });
}

addUser('ris@dundee.ac.uk', 'RIS', 'Fred Gregington');
addUser('dean@dundee.ac.uk', 'Dean', 'Professor Iain Stewart');
addUser('researcher@dundee.ac.uk', 'Researcher', 'Greg Fredington');

// Projects ====================================================================
var count = 0;
function addProject(title, description, user) {
  var prj = new db.model.Project({
    projectId: count++,
    title: title,
    description: description,
    author: user
  });
  prj.save();
}

addProject('Project 1', 'Description for project 1', 3);
addProject('Project 2', 'Description for project 2', 3);
addProject('Project 3', 'Description for project 3', 3);

// Comments ====================================================================
function addComment(comment, user, project) {
  var comment = new db.model.Comment({
    comment: comment,
    projectId: project,
    staffID: user,
  });
  comment.save();
}

addComment('Hello this is a comment!', 3, 1);
addComment('Oh, hello! This is another comment', 1, 1);
addComment('Oh why hello! Can you please give me a grant?', 3, 1);
addComment('Ok then, let me get this approved for you.', 1, 1);
addComment('Great work!.', 2, 1);
