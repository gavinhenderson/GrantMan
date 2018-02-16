var mockProjects = require('./mockdata/projects.js');

var project = require('./project.js');
var comment = require('./comment.js');

// app/routes.js
module.exports = (app, passport, db) => {

  project = project(db);
  comment = comment(db);

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

  // ###########################################################################
  // PROJECTS
  // ###########################################################################

  // Get projects ==============================================================
  app.get('/project', (req, res) => {
    project.getProjects(req.user, (err, projects) => {
      if (err) res.send(err);
      res.send(projects);
    });
  });

  // Project page ==============================================================
  app.get('/project/:id', (req, res) => {
    res.send("You clicked on project: "+req.params.id);
  });

  // Comments ==================================================================
  app.get('/project/:id/comments', (req, res) => {
    comment.getComments(req.params.id, req.user, (err, comments) => {
      if (err) res.send(err);
      res.send(comments);
    });
  });

  app.post('/project/:id/comments', (req, res) => {
    if (!req.body.comment) res.send("Error: A comment body is required");
    comment.postComment(req.params.id, req.body.comment, req.user, () => {
      res.send("Success.");
    });
  });


  // ###########################################################################
  // AUTHENTICATION
  // ###########################################################################

  // Login page ================================================================
  app.get('/login', (req, res) => {
    res.render('login', {message: req.flash('error')});
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.'
  }));

  // Create account ===========================================================
  app.get('/createaccount', (req, res) => {
    res.render('createaccount',{user:req.user})
  });

  app.post('/createaccount', (req,res) => {
    require('./account.js').createUser(req.body,function(user){
      user.save();
    });
    res.send('Account created');
  })

  // Logout ====================================================================
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

}
