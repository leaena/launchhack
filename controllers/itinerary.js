/**
 * GET /
 * Itinerary page.
 */

exports.index = function(req, res) {
  console.log(req.params.username);
  res.render('itinerary', {
    title: 'Itinerary',
    username: req.params.username
  });
};
