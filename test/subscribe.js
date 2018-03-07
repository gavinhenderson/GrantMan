var assert = require("assert");
var mongoose = require("mongoose");
var db = require("../app/database.js")(mongoose);
var subscribe = require("../app/subscribe.js")(db);

describe('Subscriptions',()=>{
  it('Projects should all have the author as a subscriber upon creation', done => {
    db.model.Project.findOne({ title: "Project 1" })
      .populate({
        path: "subscribers",
        select: "_id"
      })
      .exec((err,project) => {
        done(err);
        console.log(project);
        assert.equal(project.subscribers.length, 1, "Checking there is one subscriber");
      });
  });
  it('Add Subscriptions', done => {
    db.model.User.findOne({ email : "ris@dundee.ac.uk" }, (err,user) => {
      done(err);
      console.log("test1")
      db.model.Project.findOne({ title: "Project 1" })
        .populate({
          path: "subscribers",
          select: "name"
        })
        .exec((err,project) => {
          console.log("test2");
          done(err);
          subscribe.addSubscriber(project._id, user._id, (err) => {
            done(err);
            subscribe.getSubscribers(project._id, (err, subscribers)=>{
              done(err);
              assert.equals(subscribers.length, 2, "Checking a subscriber is added")
            });
          });
      });
    });
  });
});
