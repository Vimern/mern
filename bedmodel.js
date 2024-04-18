const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bedSchema = new Schema({
  bedNumber: {
    type: String,
    required: true,
    // unique: true
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  occupied: {
    type: Boolean,
    default: false,
  },
  allocatedPatient: {
    type: Schema.Types.ObjectId,
    ref: "ipdPatient",
  }, //remove after discharged
});

module.exports = mongoose.model("Bed",bedSchema);