const mongoose = require("mongoose");
const specializationCategory = new mongoose.Schema({
  specializationName: {
    type: String,
  },
});

module.exports = mongoose.model("Specialization", specializationCategory);
