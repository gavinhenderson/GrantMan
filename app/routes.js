// app/routes.js
module.exports = (app, passport) => {

  // Home page =================================================================
  app.get('/', (req, res) => {
    // Get the current date
    var cDate = new Date();
    var dateTime = cDate.getDate() + "/"
                  + (cDate.getMonth()+1)  + "/"
                  + cDate.getFullYear() + " @ "
                  + cDate.getHours() + ":"
                  + cDate.getMinutes() + ":"
                  + cDate.getSeconds();

    var data = {
      genDate: dateTime,
      loggedIn: true
    }
    // Pass to the template
    res.render('index',data);
  });

  // Login page ================================================================
  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

}
