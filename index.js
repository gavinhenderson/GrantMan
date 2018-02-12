// Dependencies
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');

// Express setup
const app = express();
const opts = {
  key: fs.readFileSync('/etc/letsencrypt/live/grant.mhi.io/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/grant.mhi.io/fullchain.pem')
}

// View engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Set the app to listen on port 80
https.createServer(opts, app).listen(443, () => {
  console.log("Listening on 443");
});
