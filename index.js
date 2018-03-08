// Dependencies ================================================================
const express  = require("express");
const mongoose = require("mongoose");
const fs       = require("fs");
const https    = require("https");
const passport = require("passport");
const session  = require("express-session");
const mstore   = require("connect-mongodb-session")(session);
const flash    = require("connect-flash");

const LocalStrategy = require("passport-local").Strategy;
const cookieParser  = require("cookie-parser");
const bodyParser    = require("body-parser");
const fileUpload    = require("express-fileupload");
const nodemailer 		= require("nodemailer");

// Setup =======================================================================
// Debug CLI option [should probably replace with node.env]
var debug = false;
if (process.argv[2] == "--debug") debug = true;

// Database setup
var db = require("./app/database.js")(mongoose);

// Passport setup
passport.serializeUser(function(user, done) {
	done(null, user.staffID);
});

passport.deserializeUser(function(id, done) {
	db.model.User.findOne({ staffID: id }, (err, user) => {
		if (err) return done(err);
		if (!user) return done(null, false, "User not found.");
		return done(null, user);
	});
});

// Passport Setup
passport.use(new LocalStrategy({
	usernameField: "email",
	passwordField: "password"
}, require("./app/authenticate.js")(db)));

// Express setup
const app = express();

// Store setup
var store = new mstore(
	{
	  uri: "mongodb://localhost:27017/grantman_sessions",
	  collection: "mySessions"
	});

// Catch errors
store.on("error", function(error) {
	assert.ifError(error);
	assert.ok(false);
});

// View engine
app.set("view engine", "ejs");

//Serving static files
app.use(express.static("public"));

// Cookie and body parsing for sessions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	store: store,
	secret: "php is a dying language",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(fileUpload());

// create reusable transporter object using the default SMTP transport
var mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "***REMOVED***", // generated ethereal user
        pass: "***REMOVED***" // generated ethereal password
    }
});

// Routes ======================================================================
require("./app/routes.js")(app, passport, db, mail); // Load routes from routes.js

// Launch ======================================================================
// Initialise the app
if (debug) {
	// Debug code
	app.listen(3000, () => console.log("Debugging on port 3000"));
} else {
	// Production code
	// SSL/TLS options
	const opts = {
		key: fs.readFileSync("/etc/letsencrypt/live/grant.mhi.io/privkey.pem"),
		cert: fs.readFileSync("/etc/letsencrypt/live/grant.mhi.io/fullchain.pem")
	};

	// Set the app to listen on port 80
	https.createServer(opts, app).listen(443, () => {
		console.log("Listening on 443");
	});

	// Redirect http to https
	const http = express();
	http.get("*", (req, res) => {
		res.redirect("https://" + req.headers.host + req.url);
	});
	http.listen(80, () => console.log("Redirecting from port 80"));
}
