// Dependencies
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Express setup
const app = express();

// View engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
});

app.listen(80, () => console.log('Server started on port 3000'));
