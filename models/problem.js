const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const problemSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: true,
  },
  species:{
    type:String,
  },
  problemDetails: [{ type: ObjectId, ref: "problemdetails" }],
});

module.exports = mongoose.model("problems", problemSchema);
