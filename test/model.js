var expect = require('chai').expect;
var model = require('../app/models/models.js')

describe("Models", function() {

	describe("User", function() {

		it('should be invalid if there is no staffID', function(done) {

			// Create mock model
			var user = new model.User({staffID: 1});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.staffID) done(err.errors.staffID);
				else done();
			});

		});

		it('should be invalid if there is no password', function(done) {

			// Create mock model
			var user = new model.User({password: "test"});
			// var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.password) done(err.errors.password);
				else done();
			});

		});

		it('should be invalid if there is no email', function(done) {

			// Create mock model
			var user = new model.User({email: "test@example.com"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.email) done(err.errors.email);
				else done();
			});

		});

		it('should be invalid if there is no type', function(done) {

			// Create mock model
			var user = new model.User({type: "test"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.type) done(err.errors.type);
				else done();
			});

		});

		it('should be invalid if there is no name', function(done) {

			// Create mock model
			var user = new model.User({name: "test"});

			// Valid User Model
			user.validate(function(err) {
				if (err.errors.name) done(err.errors.name);
				else done();
			});

		});

		it('should be invalid if there is no school', function(done) {

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

		it('should be invalid if there is no array of staff', function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.staff).to.exist;
			});

		});

		it('should be invalid if there is no fileHash', function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.fileHash).to.exist;
			});

		});

		it('should be invalid if there is no iteration', function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.iteration).to.exist;
			});

		});

		it('should be invalid if there is no title', function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.title).to.exist;
			});

		});

		it('should be invalid if there is no description', function() {

			// Create mock model
			var user = new model.User();

			// Valid User Model
			user.validate(function(err) {
				expect(err.errors.description).to.exist;
			});

		});

	});

});
