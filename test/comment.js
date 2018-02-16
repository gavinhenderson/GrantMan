// Authentication testing
// Dependeicies ================================================================
var assert = require("assert");

var mongoose = require("mongoose");
var db = require("../app/database.js")(mongoose);

var comment = require("../app/comment.js")(db);

// Tests =======================================================================
describe("Comment", function() {
	// Posting ===================================================================
	describe("Posting comment", function() {
		it("comment should post to project", function(done) {
			db.model.User.findOne({}, function(err, user) {
				db.model.Project.findOne({}, function(err, project) {
					comment.postComment(project.projectId, "TEST COMMENT", user.staffID, function(err) {
						assert.ok(!err);
						done(err);
					});
				});
			});
		});
	});

	describe("Fetching comments", () => {
		it("comment should post to project", (done) => {
			db.model.User.findOne({}, (err, user) => {
				db.model.Project.findOne({}, (err, project) => {
					comment.getComments(project.projectId, user.staffID, (err, comments) => {
						assert.ok(comments.length > 0);
						done(err);
					});
				});
			});
		});
	});
});
