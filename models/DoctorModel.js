var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobno: {
    type: Number,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  latitude:{
    type:String
  },
  longitude:{
    type:String
  },
  expertise: {
    type: String,
  },
});

module.exports = mongoose.model("doctors", UserSchema);
