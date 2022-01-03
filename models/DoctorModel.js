var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  mobno: {
    type: Number,
    // required:true,
    // unique: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  expertise: {
    type: String,
  },
});

module.exports = mongoose.model("doctors", UserSchema);
