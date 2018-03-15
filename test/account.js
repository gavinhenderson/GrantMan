var assert = require("assert");
var mongoose = require("mongoose");
var db = require("../app/database.js")(mongoose);
var account = require("../app/account.js")(db);


var mockUser = {
	name: "Bobby",
	type: "RIS",
	id: Math.floor((Math.random() * 999999)),
	password: "pass",
	school: "the world",
	email: "bobby@dundee.ac.uk"
};

var failUser = {
	name: "Fail"
};

var mockBody = {
	oldPassword: "password",
	newPassword: "newPassword",
};

var failBody = {
	oldPassword: "wrong",
	newPassword: "",
};


describe("Accounts",function(){
	it("Valid account creates without error",function(done){
		account.createUser(mockUser, err => {
			assert.ok(!err, "a valid user is created");
			done(err);
		});
	});
	it("Invalid account creates with error",function(done){
		//Doesnt give all required fields
		account.createUser(failUser, err => {
			assert.ok(err, "an invalid user is not created");
			done();
		});
	});
});

describe("Passwords", function(){
	it("Valid password changes without error", function(done){
		db.model.User.findOne({"email": "ris@dundee.ac.uk"}, (err, obj) => {
			account.changePassword(mockBody, obj, (err) => {
				console.log(err);
				assert.ok(!err, "a valid password is changed");
				done();
			});
		});
	});
	it("Invalid password entered", function(done){
		db.model.User.findOne({"email": "ris@dundee.ac.uk"}, (err, obj) => {
			account.changePassword(failBody, obj, err => {
				console.log(err);
				assert.ok(err, "an invalid password is entered");
				done();
			});
		});
	});
});
