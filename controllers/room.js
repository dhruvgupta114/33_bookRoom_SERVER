const Room = require("../models/Room")
const Hotel = require("../models/Hotel")
const createError = require("../utils/errorHandler")

const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

const updateRoom = async(req,res, next) =>{
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updateRoom)
    }catch(err){
        next(err)
    }
}
 const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };
const deleteRoom = async(req,res, next) =>{
    const hotelId = req.params.hotelid
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json({
            message: "Room has been Deleted"
        })
    }catch(err){
        next(err)
    }
}
const getRoom = async(req,res, next) =>{
    try {
        const room =  await Room.findById(req.params.id)
         res.status(200).json(room)
     }catch(err){
         next(err)
     }
}
const getAllRoom = async(req,res, next) =>{
    try {
        const rooms =  await Room.find()
         res.status(200).json(rooms)
     }catch(err){
         next(err)
     }
}

module.exports = {
    createRoom,
    deleteRoom,getAllRoom,getRoom,updateRoom,updateRoomAvailability
}