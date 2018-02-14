// app/authenticate.js
module.exports = (username, password, done) => {
  // Todo: Real auth
  if (username == "user@user.com") {
    if (password == "pass") {
      return done(null, { name: 'Bobby Drop Tables', id: 125180, type: "RIS" });
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  } else {
    return done(null, false, { message: 'Incorrect username.' });
  }
}
