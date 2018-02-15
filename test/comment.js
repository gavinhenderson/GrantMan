// Authentication testing
// Dependeicies ================================================================
var assert = require('assert');
var authenticate = require('../app/comment.js');

var mongoose = require('mongoose');
var db = require('../app/database.js')(mongoose);

var comment = require('../app/comment.js');

// Tests =======================================================================
describe('Comment', () => {
  // Posting ===================================================================
  describe('Posting comment', () => {
    it('comment should post to project', () => {
      db.model.User.findOne({}, (err, user) => {
        db.model.Project.findOne({}, (err, project) => {
          comment.postComment(project.projectId, 'TEST COMMENT', user.staffID, (err) => {
            assert.ok(!err);
          });
        });
      });
    });
  });

  describe('Fetching comments', () => {
    it('comment should post to project', () => {
      db.model.User.findOne({}, (err, user) => {
        db.model.Project.findOne({}, (err, project) => {
          comment.getComments(project.projectId, user.staffID, (err, comments) => {
            assert.ok(comments.length > 0);
          });
        });
      });
    });
  });
});
