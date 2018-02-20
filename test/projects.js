// Authentication testing
// Dependeicies ================================================================
var assert = require("assert");

var mongoose = require("mongoose");
var db = require("../app/database.js")(mongoose);

var project = require("../app/project.js")(db);

// Tests =======================================================================
describe("Projects", () => {
	describe("Fetching projects", () => {
		it("should not error when given a user with projects", done => {
			db.model.User.findOne({}, (err, user) => {
				project.getProjects(user, (err) => {
					assert.ok(!err);
					done(err);
				});
			});
		});
		it("should return a list of projects to a researcher", done => {
			db.model.User.findOne({ type: "Researcher" }, (err, user) => {
				project.getProjects(user, (err, projects) => {
					assert.ok(projects.length > 0);
					done(err);
				});
			});
		});
		it("should return a list of projects to another user", done => {
			db.model.User.findOne({ type: "Dean" }, (err, user) => {
				project.getProjects(user, (err, projects) => {
					assert.ok(projects.length > 0);
					done(err);
				});
			});
		});
	});

	describe("Status update", () => {
		// Helper function
		var testValid = (action, type, done) => {
			db.model.User.findOne({ type: type }, (err, user) => {
				if (err) done(err);
				assert.ok(user);

				project.updateStatus(action, null, 1, user, done);
			});
		};
		var testInvalid = (action, type, done) => {
			db.model.User.findOne({ type: type }, (err, user) => {
				if (err) done(err);
				assert.ok(user);

				project.updateStatus(action, null, 1, user, err => {
					assert.ok(err);
					done();
				});
			});
		}

		describe("RIS approval", () => {
			it("a researcher can set the project status to RIS approval", done => {
				testValid("RIS approval", "Researcher", done);
			});
			it("RIS cannot set the project status to RIS approval", done => {
				testInvalid("RIS approval", "RIS", done)
			});
			it("Associate Dean cannot set the project status to RIS approval", done => {
				testInvalid("RIS approval", "Associate Dean", done)
			});
			it("Dean cannot set the project status to RIS approval", done => {
				testInvalid("RIS approval", "Dean", done)
			});
		});

		describe("Associate Dean approval", () => {
			it("a researcher can set the project status to " + "Associate Dean approval", done => {
				testValid("Associate Dean approval", "Researcher", done);
			});
			it("RIS cannot set the project status to " + "Associate Dean approval", done => {
				testInvalid("Associate Dean approval", "RIS", done)
			});
			it("Associate Dean cannot set the project status to " + "Associate Dean approval", done => {
				testInvalid("Associate Dean approval", "Associate Dean", done)
			});
			it("Dean cannot set the project status to " + "Associate Dean approval", done => {
				testInvalid("Associate Dean approval", "Dean", done)
			});
		});

		describe("Researcher approval", () => {
			it("a researcher cannot set the project status to " + "Researcher approval", done => {
				testInvalid("Researcher approval", "Researcher", done);
			});
			it("RIS can set the project status to " + "Researcher approval", done => {
				testValid("Researcher approval", "RIS", done)
			});
			it("Associate Dean cannot set the project status to " + "Researcher approval", done => {
				testInvalid("Researcher approval", "Associate Dean", done)
			});
			it("Dean cannot set the project status to " + "Researcher approval", done => {
				testInvalid("Researcher approval", "Dean", done)
			});
		});

		describe("Researcher amendment", () => {
			it("a researcher cannot set the project status to " + "Researcher amendment", done => {
				testInvalid("Researcher amendment", "Researcher", done);
			});
			it("RIS can set the project status to " + "Researcher amendment", done => {
				testValid("Researcher amendment", "RIS", done)
			});
			it("Associate Dean can set the project status to " + "Researcher amendment", done => {
				testValid("Researcher amendment", "Associate Dean", done)
			});
			it("Dean can set the project status to " + "Researcher amendment", done => {
				testValid("Researcher amendment", "Dean", done)
			});
		});

		describe("Dean approval", () => {
			it("a researcher cannot set the project status to " + "Dean approval", done => {
				testInvalid("Dean approval", "Researcher", done);
			});
			it("RIS cannot set the project status to " + "Dean approval", done => {
				testInvalid("Dean approval", "RIS", done)
			});
			it("Associate Dean can set the project status to " + "Dean approval", done => {
				testValid("Dean approval", "Associate Dean", done)
			});
			it("Dean cannot set the project status to " + "Dean approval", done => {
				testInvalid("Dean approval", "Dean", done)
			});
		});

		describe("Project approved", () => {
			it("a researcher cannot set the project status to " + "Project approved", done => {
				testInvalid("Project approved", "Researcher", done);
			});
			it("RIS cannot set the project status to " + "Project approved", done => {
				testInvalid("Project approved", "RIS", done)
			});
			it("Associate Dean cannot set the project status to " + "Project approved", done => {
				testInvalid("Project approved", "Associate Dean", done)
			});
			it("Dean can set the project status to " + "Project approved", done => {
				testValid("Project approved", "Dean", done)
			});
		});

	});
});
