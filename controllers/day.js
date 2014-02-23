/*
  * GET /
  * Generic day page.
 */
var User = require('../models/User');
var campsites = require('../models/campsiteData');

exports.index = function(req, res) {
  // var itinerary = [];
  User.find({username:req.params.username},function(err,obj){
  	if (err) {console.error(err);}
    var itinerary = obj[0].itinerary;
    var campsiteName = itinerary[req.params.date-1];
    // var milesFromSouth
    var elevation, miles, tripReportUrl, tripReportFile;
    var prevPossible = true;
    var nextPossible = true;
    //OK now look for that campsite name in the campsite array in order to find the index
    //"photoUrl":"http://www.flickr.com/photos/windwalkerimages/351370565/","photoFile":2},
    for (var i=0 ; i<campsites.campsiteData.length ; i++) {
      if (campsites.campsiteData[i].campsiteName === campsiteName) {
        elevation = campsites.campsiteData[i].elevation;
        // console.log(obj[0].northsouth);
        // if (!obj[0].northsouth) {
        //   miles = campsites.campsiteData[i].milesFromSouth;
        // } else {
          miles = (211.4 - campsites.campsiteData[i].milesFromSouth).toFixed(1);
        // }
        tripReportUrl = campsites.campsiteData[i].tripReport;
        tripReportFile = campsites.campsiteData[i].tripReportFile;
        if (parseInt(req.params.date) === 1) {
          prevPossible = false;
        }
        if (parseInt(req.params.date) === itinerary.length ) {
          nextPossible = false;
          console.log("too big");
        }
      }
    }
    console.log("nextPossible",req.params.date, itinerary.length);

    res.render('day', { infos: {
      title: req.params.date,
      username: req.params.username,
      date: req.params.date,
      campsiteName: campsiteName,
      elevation:elevation,
      miles: miles,
      tripReportUrl: tripReportUrl,
      tripReportFile: tripReportFile,
      nextPossible: nextPossible,
      prevPossible: prevPossible
    }});
  });
};
