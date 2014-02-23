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
  req.body.northsouth = req.body.northsouth || false;
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