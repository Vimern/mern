const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roomCategory",
  },

  roomNumber: {
    type: String,
    required: true,
   
  },
  totalBeds: {
    type: Number,
    required: true,
  },

  beds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bed",
    },
  ],
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('roomSchema',roomSchema);



