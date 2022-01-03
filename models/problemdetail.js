const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const problemDetailSchema = new mongoose.Schema({
  problemDetail: {
    type: String,
    required: true,
  },
  problemid:{
    type: ObjectId,
    ref: "problems",
  }
});

module.exports = mongoose.model("problemdetails", problemDetailSchema);
