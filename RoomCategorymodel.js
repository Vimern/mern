const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomCategorySchema = new Schema({
  roomCategoryName: {
    type: String,
    unique: true,
  },
  roomNUmber: [
    {
      type:String,
      isActive: {
        type: Boolean,
        default: true
      },
    },
  ],
});



module.exports = mongoose.model("roomCategory",roomCategorySchema);

const bedSchema = new Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('room',bedSchema);


