const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const saveproblemSchema = new mongoose.Schema({
  species: { type: ObjectId, ref: "Species" },
  problems: { type: ObjectId, ref: "Problem" },
  problemdetail: { type: ObjectId, ref: "ProblemDetail" },
});

module.exports = mongoose.model("SaveProblem", saveproblemSchema);