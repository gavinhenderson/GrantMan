// Authentication testing
// Dependeicies ================================================================
var assert = require('assert');
var authenticate = require('../app/comment.js');

var mongoose = require('mongoose');
var db = require('../app/database.js')(mongoose);

var project = require('../app/project.js')(db);

// Tests =======================================================================
describe('Projects', () => {
  describe('Fetching projects', () => {
    it('should not error when given a user with projects', done => {
      db.model.User.findOne({}, (err, user) => {
        project.getProjects(user, (err, projects) => {
          assert.ok(!err);
          done(err);
        });
      });
    });
    it('should return a list of projects to a researcher', done => {
      db.model.User.findOne({ type: 'Researcher' }, (err, user) => {
        project.getProjects(user, (err, projects) => {
          assert.ok(projects.length > 0);
          done(err);
        });
      });
    });
    it('should return a list of projects to another user', done => {
      db.model.User.findOne({ type: 'Dean' }, (err, user) => {
        project.getProjects(user, (err, projects) => {
          assert.ok(projects.length > 0);
          done(err);
        });
      });
    });
    it('should error when given a non-existant user', done => {
      db.model.User.findOne({}, (err, user) => {
        user.staffID = -1; // Negative numbers should not be supported
        project.getProjects(user, (err, projects) => {
          assert.ok(err);
          done();
        });
      });
    });
  });

  describe('Status update', () => {
    it('a researcher can set the project status to waiting', done => {
      db.model.User.findOne({ type: 'Researcher' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Waiting", 1, user, done);
      });
    });
    it('a RIS staff member can set the project status to waiting', done => {
      db.model.User.findOne({ type: 'RIS' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Waiting", 1, user, done);
      });
    });
    it('a Dean can set the project status to waiting', done => {
      db.model.User.findOne({ type: 'Dean' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Waiting", 1, user, done);
      });
    });
    it('a RIS staff member can set the project status to complete', done => {
      db.model.User.findOne({ type: 'RIS' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Complete", 1, user, done);
      });
    });
    it('a Dean can set the project status to complete', done => {
      db.model.User.findOne({ type: 'Dean' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Complete", 1, user, done);
      });
    });
    it('a RIS staff member can set the project status to rejected', done => {
      db.model.User.findOne({ type: 'RIS' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Rejected", 1, user, done);
      });
    });
    it('a Dean can set the project status to rejected', done => {
      db.model.User.findOne({ type: 'Dean' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Rejected", 1, user, done);
      });
    });
    it('a Researcher cannot set the project status to complete', done => {
      db.model.User.findOne({ type: 'Researcher' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Complete", 1, user, err => {
          assert.ok(err);
          done();
        });
      });
    });
    it('a Researcher cannot set the project status to rejected', done => {
      db.model.User.findOne({ type: 'Researcher' }, (err, user) => {
        if (err) done(err);
        assert.ok(user);

        project.updateStatus("Rejected", 1, user, err => {
          assert.ok(err);
          done();
        });
      });
    });
  })
});
