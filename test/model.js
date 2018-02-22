var expect = require("chai").expect;
var model = require("../app/models/models.js");

describe("Models", function() {

	describe("User", function() {

		it("should force staffID as a required type", function(done) {

			// Create mock model
			var user = new model.User({staffID: 1});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.staffID) done(err.errors.staffID);
				else done();
			});

		});

		it("should force password as a required type", function(done) {

			// Create mock model
			var user = new model.User({password: "password"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.password) done(err.errors.password);
				else done();
			});

		});

		it("should force type as an enumerator value [RIS]", function(done) {

			// Create mock model
			var user = new model.User({type: "RIS"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.type) done(err.errors.type);
				else done();
			});

		});

		it("should force type as an enumerator value [Researcher]", function(done) {

			// Create mock model
			var user = new model.User({type: "Researcher"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.type) done(err.errors.type);
				else done();
			});

		});

		it("should force type as an enumerator value [Dean]", function(done) {

			// Create mock model
			var user = new model.User({type: "Dean"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.type) done(err.errors.type);
				else done();
			});

		});

		it("should force type as an enumerator value [Associate Dean]", function(done) {

			// Create mock model
			var user = new model.User({type: "Associate Dean"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.type) done(err.errors.type);
				else done();
			});

		});

		it("should not allow values not in the enumerator", function(done) {

			// Create mock model
			var user = new model.User({type: "Not A Type"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.type) done();
				else done(err.errors.type);
			});

		});

		it("should force name as a required type", function(done) {

			// Create mock model
			var user = new model.User({name: "John Doe"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.name) done(err.errors.name);
				else done();
			});

		});

		it("should force school as a required type", function(done) {

			// Create mock model
			var user = new model.User({school: "School of Rock"});

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
