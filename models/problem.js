const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const problemSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: true,
  },
  speciesId:{ type: ObjectId,
     ref: "species"
     },
    problemDetails: { type: Array},
});

module.exports = mongoose.model("problems", problemSchema);
