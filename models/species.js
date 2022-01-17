const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const speciesSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
  },
  // problems: [{ type: ObjectId, ref: "problems" }],
});

module.exports = mongoose.model("species", speciesSchema);
