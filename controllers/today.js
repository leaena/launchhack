/**
 * GET /
 * Today page.
 */

exports.index = function(req, res) {
  res.render('today', {
    title: 'Today',
    username: req.params.username,
    date: req.params.date
  });
};