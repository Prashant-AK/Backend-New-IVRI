const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const problemDetailSchema = new mongoose.Schema({
  problemDetail: {
    type:Array,
  },
  speciesId:{ type: ObjectId,
    ref: "species"
    },
  problemid:{
    type: ObjectId,
    ref: "problems",
  }
});

module.exports = mongoose.model("problemdetails", problemDetailSchema);
