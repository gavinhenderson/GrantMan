var mockProjects = require('./mockdata/projects.js')

// app/routes.js
module.exports = (app, passport, db) => {

  // Home page =================================================================
  app.get('/',
    (req, res) => {
      console.log(req.user);
      if (req.user) {
        // Render the index
        var data = {
          user: req.user,
          projects: mockProjects
        };
        res.render('index', data);
      } else {
        // Redirect to login
        res.redirect('/login')
      }
    });

  // Project page ==============================================================
  app.get('/project/:id', (req, res) => {
    res.send("You clicked on project: "+req.params.id);
  });

  // Login page ================================================================
  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // Logout ====================================================================
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

}
