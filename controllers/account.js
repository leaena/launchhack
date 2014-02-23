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
  function endAfterStart(start,end){
    return new Date(start.split('/').reverse().join('/')) <
            new Date(end.split('/').reverse().join('/'));
  }
  req.body.northsouth = req.body.northsouth || false;
  req.assert('name', 'Name required.').notEmpty();
  req.assert('edate', 'Start date must be before end date.').dateRange(req.body.sdate);
  req.assert('sdate', 'Start date must be in the future.').futureDate();
  req.assert('northsouth', 'You must choose a direction.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }
  checkUsername(req, res);
}

var createItinerary = function(req){
  var diffDays = function(firstDate,secondDate) {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  };

  var sdate = new Date(req.body.sdate);
  var edate = new Date(req.body.edate);
  var howManySites = campsites.campsiteData.length;
  var howManyDays = diffDays(edate,sdate);

  var itineraryArray = [];
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
  return itineraryArray;
};

var createUser = function(req, res){
  var itineraryArray = createItinerary(req);

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
};

var checkUsername = function(req, res){
  User.find({username: req.body.name}, function(e, user){
    if(e) console.log(e);
    if(user.length === 0){
      createUser(req, res);
    } else {
      var date = Math.floor(new Date().getTime() / 1000);
      req.body.name = req.body.name + date;
      createUser(req, res);
    }
  });
};
