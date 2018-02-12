// Dependencies
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');

// Debug CLI option
var debug = false;
if (process.argv[2] == "--debug") debug = true;

// Express setup
const app = express();

// Get SSL/TLS setup if in production
var opts;
if (!debug) {
  opts = {
    key: fs.readFileSync('/etc/letsencrypt/live/grant.mhi.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/grant.mhi.io/fullchain.pem')
  }
}

// View engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  // Get the current date
  var cDate = new Date();
  var dateTime = cDate.getDate() + "/"
                + (cDate.getMonth()+1)  + "/"
                + cDate.getFullYear() + " @ "
                + cDate.getHours() + ":"
                + cDate.getMinutes() + ":"
                + cDate.getSeconds();

  // Pass to the template
  res.render('index', { genDate: dateTime });
});

// Initialise the app
if (debug) {
  // Debug code
  app.listen(3000, () => console.log("Debugging on port 3000"));
} else {
  // Production code
  // Set the app to listen on port 80
  https.createServer(opts, app).listen(443, () => console.log("Listening on 443"));

  // Redirect http to https
  const http = express();
  http.get('*', (req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
  });
  http.listen(80, () => console.log("Redirecting from port 80"));
}
