var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});

router.get('/register', function (req, res) {
  res.render('auth/register');
});
//Handle the submission of the Register form
router.post('/register', function (req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) return res.render('auth/register', {user: user});
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

//Display a Login form
router.get('/login', function(req, res) {
  res.render('auth/login', {user : req.user});
});
//Handle the Login submission
router.post('/login', passport.authenticate(
  'local',
  {
    failureRedirect: '/login'
  }),
  function (req, res, next) {
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  }
);
//Logout a currently authenticated user
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
