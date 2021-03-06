var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  sdate: {type: Date},
  edate: {type: Date},
  northsouth: {type: Boolean},
  itinerary: {type: Array}
});

module.exports = mongoose.model('User', userSchema);
