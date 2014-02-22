/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home',
    index: true
  });
};

exports.submitItinerary = function(req, res) {
  console.log(req.body);
  req.body.name = req.body.name || 'demo';
  res.redirect('/itinerary/' + req.body.name);
};

