/**
 * GET /
 * Itinerary page.
 */

exports.index = function(req, res) {
  res.render('itinerary', { infos: {
    title: 'Itinerary',
    username: req.params.username
  }
});
};
