var expect = require("chai").expect;
var model = require("../app/models/models.js");

describe("Models", function() {

	describe("User", function() {

		it("should be invalid if there is no staffID", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.staffID).to.exist;
			});

		});

		it("should be invalid if there is no password", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.password).to.exist;
			});

		});

		it("should be invalid if there is no email", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.email).to.exist;
			});

		});

		it("should be invalid if there is no type", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.type).to.exist;
			});

		});

		it("should be invalid if there is no name", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.name).to.exist;
			});

		});

		it("should be invalid if there is no school", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.school).to.exist;
			});

		});

	});

	describe("Project", function() {

		it("should be invalid if there is no array of staff", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.staff).to.exist;
			});

		});

		it("should be invalid if there is no fileHash", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.fileHash).to.exist;
			});

		});

		it("should be invalid if there is no iteration", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.iteration).to.exist;
			});

		});

		it("should be invalid if there is no title", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.title).to.exist;
			});

		});

		it("should be invalid if there is no description", function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.description).to.exist;
			});

		});

	});

});
