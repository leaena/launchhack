/**
 * GET /
 * Home page.
 */

exports.campsiteList = function(db) {
  // res.render('home', {
  //   title: 'Campsite List'
  // });



    return function(req, res) {
        var collection = db.collection('campsiteCollection');
        collection.find({},{}).toArray(function(e,docs){
        	console.log(docs);
            res.render('home', {
                "campsiteList" : docs
            });
        });
    };
};
