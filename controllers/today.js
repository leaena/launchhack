/**
 * GET /
 * Today page.
 */

exports.index = function(req, res) {
    console.log(req.params.username);
    console.log(req.params.date);
  res.render('today', {
    title: 'Today',
    username: req.params.username,
    date: req.params.date
  });
};