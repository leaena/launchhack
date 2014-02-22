var passport = require('passport');
var _ = require('underscore');
var User = require('../models/User');

/**
 * POST /checkAccount
 * Check for current user.
 *
 */

exports.checkAccount = function(req, res){
  function endAfterStart(start,end){
    return new Date(start.split('/').reverse().join('/')) <
            new Date(end.split('/').reverse().join('/'));
  }

  req.assert
  req.assert('name', 'Name required.').notEmpty();
  req.assert('edate', 'Start date must be before end date.').dateRange(req.body.sdate);
  req.assert('northsouth', 'You must choose a direction.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }
  req.body.name = req.body.name || 'demo';
  checkUsername(req, res);
}

var checkUsername = function(req, res){
  User.find({username: req.body.name}, function(e, user){
    if(e) console.log(e);
    if(user.length === 0){
      var user = new User({
        username: req.body.name,
        sdate: req.body.sdate,
        edate: req.body.edate,
        northsouth: req.body.northsouth
      });
      user.save( function(error, data){
          if(error){
              res.json(error);
          }
          else {
            res.redirect('/itinerary/' + req.body.name);
          }
      });
    } else {
      var date = Math.floor(new Date().getTime() / 1000);
      req.body.name = req.body.name + date;
      var user = new User({
        username: req.body.name,
        sdate: req.body.sdate,
        edate: req.body.edate,
        northsouth: req.body.northsouth
      });
      user.save( function(error, data){
          if(error){
              res.json(error);
          }
          else {
            res.redirect('/itinerary/' + req.body.name);
          }
      });
    }
  });
};

/**
 * GET /login
 * Login page.
 */

exports.getLogin = function(req, res) {

  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 * @param email
 * @param password
 */

exports.postLogin = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }

    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in.' });
      return res.redirect('/');
    });
  })(req, res, next);
};

/**
 * GET /signup
 * Signup page.
 */

// exports.getSignup = function(req, res) {
//   console.log(req.params.username);
//   if (req.user) return res.redirect('/');
//   res.render('account/signup', {
//     title: 'Create Account',
//     username: req.params.username
//   });
// };

/**
 * POST /signup
 * Create a new local account.
 * @param username
 * @param password
 */

// exports.postSignup = function(req, res, next) {
//   req.assert('password', 'Password must be at least 4 characters long').len(4);
//   req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

//   var errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/createAccount');
//   }

//   var user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });

//   user.save(function(err) {
//     if (err) {
//       if (err.code === 11000) {
//         req.flash('errors', { msg: 'User with that email already exists.' });
//       }
//       return res.redirect('/createAccount');
//     }
//     req.logIn(user, function(err) {
//       if (err) return next(err);
//       res.redirect('/itinerary');
//     });
//   });
// };