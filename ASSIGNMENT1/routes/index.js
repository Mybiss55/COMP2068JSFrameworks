var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});
/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});
/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Express' });
});

module.exports = router;
