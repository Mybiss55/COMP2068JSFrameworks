var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Router objects
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');
// Database connection
var mongoose = require('mongoose');
var globals = require('./configs/globals'); // Global configuration object
// Import HBS package
var hbs = require('hbs');
// Import Passport Modules
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var User = require('./models/user');
// Connect to MongoDB
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Passport middleware
// Configure the session
app.use(session({
  secret: "Crazy Diamond is a Stand",
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
}))
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
// Initalize passport strategy
passport.use(User.createStrategy()); // Create a new instance of the LocalStrategy
// Configure Passport to serialize and deserialize user data
passport.serializeUser(User.serializeUser()); // Serialize the user data
passport.deserializeUser(User.deserializeUser()); // Deserialize the user data

// route middleware
app.use('/', indexRouter);
app.use('/orders', ordersRouter);

// Database connection
// Connect to MongoDB
mongoose.connect(globals.ConnectionString.mongoDB)
.then(() => {
   console.log('Connected to MongoDB...')
  })
  .catch(err => {
    console.error('Could not connect to MongoDB...')
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Helpers
// Compares two values, if they are equal, it returns a selected value
hbs.registerHelper('createOptionElement', (value1, value2) => {
  console.log(`value1: ${value1}, value2: ${value2}`);
  var selectedProperty = '';
  if (value1 == value2.toString()) {
    selectedProperty = 'selected';
  }
  // Return html option selected property
  return new hbs.SafeString(
    // They must be backticks, not single quotes
    `<option ${selectedProperty}> ${value1} </option>`
  );
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
