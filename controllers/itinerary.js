/**
 * GET /
 * Itinerary page.
 */

exports.index = function(req, res) {
  res.render('itinerary', {
    title: 'Itinerary'
  });
};
