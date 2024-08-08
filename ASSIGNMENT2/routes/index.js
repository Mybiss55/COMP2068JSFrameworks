var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rainbow Feeds', user: req.user });
});
// GET /login
router.get('/login', function(req, res, next) {
  // Get messages from session object
  let messages = req.session.messages || []; // Store messages in a variable to pass to the view. If there are no messages, set it to an empty array
  // Clear the messages from the session object
  req.session.messages = [];
  // Pass the messages to the view
  res.render('login', { title: 'Login to Your Account', messages: messages });
});

// POST /login
router.post('/login', function(req, res, next) {
  passport.authenticate('local', { // first param is name of strategy Authenticate the user
    successRedirect: '/orders', // Redirect to /orders if successful
    failureRedirect: '/login', // Redirect to /login if unsuccessful
    failureMessage: 'Invalid Login' // Flash message for invalid login
  })(req, res, next);
});


// GET /register
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register a New Account' });
});

// POST /register
router.post('/register', function(req, res, next) {
  // Create a new user
  User.register(
    new User({ username: req.body.username }), // New User Object
    req.body.password,     // Plain Password to be encryptyed
    (err, newUser) => {     // callback to handle errors
     if(err) {
      console.log(err);
      return res.redirect("/register");
     }
     else {
      req.login(newUser, (err) => { // Need to login after registering
        res.redirect("/orders");
      });
     }
    }
  )
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout(err => {
    res.redirect('/login');
  });
});

// GET /github
// User is redirected to GitHub for authentication
router.get('/github', passport.authenticate('github', {scope: ['user:email']})
);

// GET /github/callback
// User is redirected back to the application after authentication
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login', failureMessage: 'Github Login Failed'
}), (req, res) => {
  res.redirect('/orders');
});

module.exports = router;
