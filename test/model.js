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

		it("should force projectId as a required type", function(done) {

			// Create mock model
			var project = new model.Project({projectId: 1});

			// Valid Project Model
			project.validate(function(err) {
				if (err.errors.projectId) done(err.errors.projectId);
				else done();
			});

		});

		it("should force title as a required type", function(done) {

			// Create mock model
			var project = new model.Project({title: "Test Project"});

			// Valid Project Model
			project.validate(function(err) {
				if (err.errors.title) done(err.errors.title);
				else done();
			});

		});

		it("should force description as a required type", function(done) {

			// Create mock model
			var project = new model.Project({description: "Test Description"});

			// Valid Project Model
			project.validate(function(err) {
				if (err.errors.description) done(err.errors.description);
				else done();
			});

		});

	});

	describe('ProjectStatus', function() {
		
		it("should force type as an enumerator value [RIS approval]", function(done) {

			// Create mock model
			var projectStatus = new model.ProjectStatus({statusMessage: "RIS approval"});

			// Valid User Model
			projectStatus.validate(function(err) {
				if (err) done(err.errors.statusMessage);
				else done();
			});

		});

		it("should force statusMessage as an enumerator value [Researcher amendment]", function(done) {

			// Create mock model
			var projectStatus = new model.ProjectStatus({statusMessage: "Researcher amendment"});

			// Valid ProjectStatus Model
			projectStatus.validate(function(err) {
				if (err) done(err.errors.statusMessage);
				else done();
			});

		});

		it("should force statusMessage as an enumerator value [Researcher approval]", function(done) {

			// Create mock model
			var projectStatus = new model.ProjectStatus({statusMessage: "Researcher approval"});

			// Valid ProjectStatus Model
			projectStatus.validate(function(err) {
				if (err) done(err.errors.statusMessage);
				else done();
			});

		});

		it("should force statusMessage as an enumerator value [Dean approval]", function(done) {

			// Create mock model
			var projectStatus = new model.ProjectStatus({statusMessage: "Researcher approval"});

			// Valid ProjectStatus Model
			projectStatus.validate(function(err) {
				if (err) done(err.errors.statusMessage);
				else done();
			});

		});

		it("should force statusMessage as an enumerator value [Associate Dean approval]", function(done) {

			// Create mock model
			var projectStatus = new model.ProjectStatus({statusMessage: "Associate Dean approval"});

			// Valid ProjectStatus Model
			projectStatus.validate(function(err) {
				if (err) done(err.errors.statusMessage);
				else done();
			});

		});

		it("should force statusMessage as an enumerator value [Project approved]", function(done) {

			// Create mock model
			var projectStatus = new model.ProjectStatus({statusMessage: "Project approved"});

			// Valid ProjectStatus Model
			projectStatus.validate(function(err) {
				if (err) done(err.errors.statusMessage);
				else done();
			});

		});

		it("should not allow values not in the enumerator", function(done) {

			// Create mock model
			var projectStatus = new model.ProjectStatus({statusMessage: "Not A statusMessage"});

			// Valid projectStatus Model
			projectStatus.validate(function(err) {
				if (err) done();
				else done(err.errors.statusMessage);
			});

		});

	});

});
