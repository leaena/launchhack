var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  sdate: {type: Date},
  edate: {type: Date},
  northsouth: {type: Boolean}
});

module.exports = mongoose.model('User', userSchema);
