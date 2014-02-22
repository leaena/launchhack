/*
  * GET /
  * Generic day page.
 */
 var User = require('../models/User');

exports.index = function(req, res) {
  console.log(req.params.username);
  console.log(User.find({username:req.params.username},function(err,obj){console.log("BANANA",err,obj);}));
  res.render('day', {
    title: req.params.date,
    username: req.params.username,
    date: req.params.date
  });
};

/* from username and date (or nth day of the trip), 
we can figure out what the name of the campsite where 
they are supposed to be staying. 
From the campsite name, we can figure out the trip
report text and URL, photo URI and URL, and elevation.
*/


