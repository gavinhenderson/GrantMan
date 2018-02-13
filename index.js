// Dependencies ================================================================
const express  = require('express');
const mongoose = require('mongoose');
const fs       = require('fs');
const https    = require('https');
const passport = require('passport');
const session  = require('express-session');

const LocalStrategy = require('passport-local').Strategy;
const cookieParser  = require('cookie-parser');

// Setup =======================================================================
// Debug CLI option
var debug = false;
if (process.argv[2] == "--debug") debug = true;

// Express setup
const app = express();

// View engine
app.set('view engine', 'ejs');

// Passport Setup
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Todo: Real auth
    if (debug) console.log('Login attempt: ' + username + ', ' + password);
    if (username === "user") {
      if (password === "pass") {
        return done(null, { user: "user" });
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, false, { message: 'Incorrect username.' });
    }
  }
));

// Routes ======================================================================
require('./app/routes.js')(app, passport); // Load routes from routes.js

// Launch ======================================================================
// Initialise the app
if (debug) {
  // Debug code
  app.listen(3000, () => console.log("Debugging on port 3000"));
} else {
  // Production code
  // SSL/TLS options
  const opts = {
    key: fs.readFileSync('/etc/letsencrypt/live/grant.mhi.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/grant.mhi.io/fullchain.pem')
  }

  // Set the app to listen on port 80
  https.createServer(opts, app).listen(443, () => {
    console.log("Listening on 443");
  });

  // Redirect http to https
  const http = express();
  http.get('*', (req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
  });
  http.listen(80, () => console.log("Redirecting from port 80"));
}
