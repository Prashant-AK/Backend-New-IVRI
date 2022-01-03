const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const DocCallSchema = new mongoose.Schema({
  callReq: {
    type: Boolean,
    default: 0,
  },
  completedCall: {
    type: Boolean,
    default: 0,
  },
  docId: {
    type: ObjectId,
    ref: "doctors",
  },
  userId: {
    type: ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("DocCallStatus", DocCallSchema);
