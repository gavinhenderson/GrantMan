// app/authenticate.js
const password = require('./password.js');

module.exports = (db, email, password, done) => {
  // Todo: Real auth
  db.User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    password.verifyHash(password, user.password, (err, res) => {
      if (err) return done(err);
      if (!res) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    });
  });
}
