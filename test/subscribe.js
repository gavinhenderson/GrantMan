var assert = require("assert");
var mongoose = require("mongoose");
var db = require("../app/database.js")(mongoose);
var subscribe = require("../app/subscribe.js")(db);

describe('Subscriptions',()=>{

  describe('Full suite tests', ()=>{

    it('Projects should all have the author as a subscriber upon creation', done => {
      db.model.Project.findOne({ title: "Project 1" })
        .populate({
          path: "subscribers",
          select: "_id"
        })
        .populate({
          path: "author",
          select: "_id"
        })
        .exec((err,project) => {
          assert.equal(project.subscribers.length, 1, "There should be 1 subscriber");
          assert.deepEqual(project.author._id, project.subscribers[0]._id, "The author should be the only subscriber");
          done(err);
        });
    });

    it('Add Subscriptions', done => {
      db.model.User.findOne({ email : "ris@dundee.ac.uk" }, (err,user) => {
        db.model.Project.findOne({ title: "Project 2" }, (err,project) => {
          subscribe.addSubscriber(project._id, user._id, (err) => {
            subscribe.getSubscribers(project._id, (err, subscribers) => {
              assert.equal(subscribers.length, 2, "Checking a subscriber is added");
              done(err);
            });
          });
        });
      });
    });

    it('Remove Subscriptions', done => {
      db.model.Project.findOne({ title: "Project 2"})
        .populate({
          path: "author",
          select: "_id"
        })
        .exec((err, project) => {
          subscribe.removeSubscriber(project._id, project.author._id, (err)=>{
            subscribe.getSubscribers(project._id, (err, subscribers)=>{
              assert.equal(subscribers.length, 1, "Checking a subscriber is removed");
              assert.notDeepEqual(subscribers[0]._id, project.author._id, "Checking the only person left isnt the removed person");
              done(err);
            })
          });
        })
    })

  });

  describe('Error tests', done => {
    var fakeID = mongoose.Types.ObjectId('4edd40c86762e0fb12000003')

    it('Check error is thrown when given an invalid id to get', done => {
      subscribe.getSubscribers(fakeID, (err, subscribers)=>{
        assert.equal(err, "Invalid id");
        done();
      })
    })

    it('Check error is thrown when given invalid ids to add', done => {
      subscribe.addSubscriber(fakeID,fakeID,(err)=>{
        assert.equal(err, "Invalid id");
        done();
      })
    })

    it('Check error is thrown when given an invalid id to remove', done => {
      subscribe.removeSubscriber(fakeID,fakeID,(err)=>{
        assert.equal(err, "Invalid id");
        done();
      })
    })
  })
});
