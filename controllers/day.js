/*
  * GET /
  * Generic day page.
 */
 var User = require('../models/User');

exports.index = function(req, res) {
  // var itinerary = [];
  User.find({username:req.params.username},function(err,obj){
  	if (err) {console.error(err);}
    var itinerary = obj[0].itinerary;
  	
    res.render('day', { infos: {
      title: req.params.date,
      username: req.params.username,
      date: req.params.date,
      itinerary: itinerary
    }});
  });
};

/* from username and date (or nth day of the trip), 
we can figure out what the name of the campsite where 
they are supposed to be staying. 
From the campsite name, we can figure out the trip
report text and URL, photo URI and URL, and elevation.
*/


