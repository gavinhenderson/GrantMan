// Authentication testing
// Dependeicies ================================================================
var assert = require("assert");
var mongoose = require("mongoose");
var db = require("../app/database.js")(mongoose);
var authenticate = require("../app/authenticate.js")(db);
var password = require("../app/password.js");

// Tests =======================================================================
describe("Authentication", () => {
	// Password handling =========================================================
	describe("Password bcrypt", () => {
		it("should generate a digest from a string input", done => {
			password.generateHash("password", (err, hash) => {
				assert.ok(hash, "the hash is given");
				done(err);
			});
		});

		it ("should verify if a password matches a hash/salt", done => {
			password.generateHash("password", (err, hash) => {
				password.verifyHash("password", hash, (err, res) => {
					assert.ok(res, "the password is correct");
					done(err);
				});
			});
		});
	});

	// Login =====================================================================
	describe("Login", () => {
		it("should login when provided valid details", done => {
			authenticate("researcher@dundee.ac.uk", "password", (err, user) => {
				// If user is not false, then authentication passed
				assert.ok(user, "a user is given");
				done(err);
			});
		});

		it("should not login when incorrect username provided", done => {
			authenticate("nonexistant@dundee.ac.uk", "password", (err, user) => {
				// If user is false, then authentication passed
				assert.ok(!user, "an invalid login attempt was unsucessful");
				done();
			});
		});

		it("should not login when incorrect password provided", done => {
			authenticate("researcher@dundee.ac.uk", "notapassword", (err, user) => {
				// If user is false, then authentication passed
				assert.ok(!user, "an invalid login attempt was unsucessful");
				done();
			});
		});
	});
});
