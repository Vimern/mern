const { isValidObjectId, default: mongoose } = require("mongoose");
const roomschema = require("../model/schemamodel");
const bedSchema = require("../model/bedmodel");


exports.createRoom = async (req, res) => {
  try {
    const { roomCategory, roomNumber, totalBeds } = req.body;

    
    const newRoom = new Room({
      roomCategory,
      roomNumber,
      totalBeds,
      beds: []
    });

    
    const bedPromises = [];
    for (let i = 0; i < totalBeds; i++) {
      const newBed = new Bed({ room: newRoom._id }); 
      bedPromises.push(newBed.save());
    }

   
    const beds = await Promise.all(bedPromises);

    
    newRoom.beds = beds.map(bed => bed._id);
    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




exports.getById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('roomCategory').populate('beds');
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






exports.deactivateRoomAndBeds = async (req,res)=>{
    const {roomId} = req.params;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const room = await Room.findByIdAndUpdate(roomId,{isActive:false},{new:true,session});
        if(!room){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({message:"No room"});
        }
        await Bed.updateMany({room:roomId},{isActive:false},{session});
        await session.commitTransaction();
        session.endSession();

        return res.status(200).send({message:"Rooms and all beds are deactivated "});
    } catch (error) {
        if(Session.inTransaction()){
            await session.abortTransaction();
        }
        session.endSession();
        return res.status(200).send({messgae:error})
        
    }
};

exports.activateRoomAndBeds= async(req,res)=>{
    const {roomId} = req.params;
    try{
        const session = await mongoose.startSession();
        session.startTransaction();

        const room = await Room.findByIdAndUpdate(roomId,{isActive:true},{new:true,session});
        if(!room){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({message:"Room not found"});
        }
        await Bed.updateMany({room:roomId},{isActive:true},{session});
        await session.commitTransaction();
        session.endSession();
        return res.status(200).send({message:"Rooms And Beds Are ACtivated"});
    }catch(error){
        await session.abortTransaction();

    }
    session.endSession();
    return res.status(400).send({message:"error"})
};




     