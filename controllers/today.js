/**
 * GET /
 * Today page.
 */

exports.index = function(req, res) {
  res.render('today', {
    title: 'Today'
  });
};