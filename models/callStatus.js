const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const callSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: String,
  },
  fname: {
    type: String,
  },
  location: {
    type: String,
  },
  AadharNo: {
    type: String,
  },
  dob: {
    type: Date,
  },
  noOfAnimal: {
    type: String,
  },
  Address: {
    type: String,
  },
  specie: {
    type: String,
  },
  problem: {
    type: String,
  },
  levelOfProblem: {
    type: String,
  },
  rejectCall: {
    type: Boolean,
    default: 0,
  },
  userId: {
    type: ObjectId,
    ref: "user",
  },
  doctorid: {
    type: ObjectId,
    ref: "doctors",
  },
  callReq: {
    type: Boolean,
    default: 0,
  },
  completedCall: {
    type: Boolean,
    default: 0,
  },
});

module.exports = mongoose.model("callstatus", callSchema);
