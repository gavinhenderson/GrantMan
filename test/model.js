var expect = require("chai").expect;
var model = require("../app/models/models.js");

describe("Models", function() {

	describe("User", function() {

		it("should be invalid if there is no staffID", function(done) {

			// Create mock model
			var user = new model.User({staffID: 1});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.staffID) done(err.errors.staffID);
				else done();
			});

		});

		it("should be invalid if there is no password", function(done) {

			// Create mock model
			var user = new model.User({password: "test"});
			// var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.password) done(err.errors.password);
				else done();
			});

		});

		it("should be invalid if there is no email", function(done) {

			// Create mock model
			var user = new model.User({email: "test@example.com"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.email) done(err.errors.email);
				else done();
			});

		});

		// TODO: FIX
		// it("should be invalid if there is no type", function(done) {
		//
		// 	// Create mock model
		// 	var user = new model.User({type: "test"});
		//
		// 	// Valid User Model
		// 	user.validate(function(err) {
		// 		if (err.errors.type) done(err.errors.type);
		// 		else done();
		// 	});
		//
		// });

		it("should be invalid if there is no name", function(done) {

			// Create mock model
			var user = new model.User({name: "test"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.name) done(err.errors.name);
				else done();
			});

		});

		it("should be invalid if there is no school", function(done) {

			// Create mock model
			var user = new model.User({school: "test"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.school) done(err.errors.school);
				else done();
			});

		});

	});

	describe("Project", function() {
/**
// TODO: Rewrite project tests
		it("should be invalid if there is no array of staff", function() {

			// Create mock model
			var project = new model.Project({projectId: 1});

			// Valid User Model
			project.validate(function(err) {
				if (err.errors.projectId) done(err.errors.projectId);
				else done();
			});

		});

		it("should be invalid if there is no fileHash", function() {

			// Create mock model
			var project = new model.Project({fileHash: "test"});

			// Valid User Model
			project.validate(function(err) {
				if (err.errors.fileHash) done(err.errors.fileHash);
				else done();
			});

		});

		it("should be invalid if there is no iteration", function() {

			// Create mock model
			var project = new model.Project({iteration: 1});

			// Valid User Model
			project.validate(function(err) {
				if (err.errors.iteration) done(err.errors.iteration);
				else done();
			});

		});

		it("should be invalid if there is no title", function() {

			// Create mock model
			var project = new model.Project({title: "test"});

			// Valid User Model
			project.validate(function(err) {
				if (err.errors.title) done(err.errors.title);
				else done();
			});

		});

		it("should be invalid if there is no description", function() {

			// Create mock model
			var project = new model.Project({description: "test"});

			// Valid User Model
			project.validate(function(err) {
				if (err.errors.description) done(err.errors.description);
				else done();
			});

		});
**/
	});

});
