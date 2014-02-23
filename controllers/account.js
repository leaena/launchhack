var passport = require('passport');
var _ = require('underscore');
var User = require('../models/User');
var campsites = require('../models/campsiteData');

/**
 * POST /checkAccount
 * Check for current user.
 *
 */

exports.checkAccount = function(req, res){
  req.body.name = req.body.name || 'demo';
  checkUsername(req, res);
}

var checkUsername = function(req, res){
  User.find({username: req.body.name}, function(e, user){
    console.log(user);
    console.log(req.body);
    if(e) console.log(e);
    if(user.length === 0){

      var diffDays = function(firstDate,secondDate) {
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
      };

      var sdate = new Date(req.body.sdate);
      var edate = new Date(req.body.edate);
      console.log("Trip will last ",diffDays(edate,sdate)," days");
      //So the itinerary needs diffDays - 1 number of campsites or one every 211.4/diffDays miles.
      // console.log("of this many campsites",campsites.campsiteData.length); //110
      var howManySites = campsites.campsiteData.length;
      var howManyDays = diffDays(edate,sdate);

      var itineraryArray = [];
      //if they are going south to north (or "northsouth:false"), the mileage values are true. 
      if (!req.body.northsouth) {
        var i=0;
        for (var j=1; j< howManyDays; j++) {
          while (campsites.campsiteData[i].milesFromSouth < j*211.4/howManyDays) {
            i++;        
          }
          itineraryArray.push(campsites.campsiteData[i].campsiteName);
        }
      } else {
        var i=howManySites-1;
        for (var j=howManyDays-1; j>0; j--) {
          while (campsites.campsiteData[i].milesFromSouth > j*211.4/howManyDays) {
            i--;        
          }
          itineraryArray.push(campsites.campsiteData[i].campsiteName);
        }        
      }

      var user = new User({
        username: req.body.name,
        sdate: req.body.sdate,
        edate: req.body.edate,
        northsouth: req.body.northsouth,
        itinerary: itineraryArray
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
      reg.body.name = req.body.name +
      res.redirect('/');
      //username already in use
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