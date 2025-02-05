const Hotel = require("../models/Hotel")
const Room = require("../models/Room")

const createHotel = async(req,res, next) =>{
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
}
const updateHotel = async(req,res, next) =>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updateHotel)
    }catch(err){
        next(err)
    }
}
const deleteHotel = async(req,res, next) =>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Hotel Deleted"
        })
    }catch(err){
        next(err)
    }
}
const getHotel = async(req,res, next) =>{
    try {
        const hotel =  await Hotel.findById(req.params.id)
         res.status(200).json(hotel)
     }catch(err){
         next(err)
     }
}
const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    // console.log("Limit", req.query.limit)
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: parseInt(min) | 1, $lt: parseInt(max) || 999 },
      })
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };

const countByCity = async(req,res, next) =>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map((city)=>{
            return Hotel.countDocuments({city: city})
        }))
         res.status(200).json(list)
     }catch(err){
         next(err)
     }
}
const countByType = async(req,res, next) =>{
   const hotelCount = await Hotel.countDocuments({type:"hotel"})
   const apartmentCount = await Hotel.countDocuments({type:"apartment"})
   const resortCount = await Hotel.countDocuments({type:"resort"})
   const villaCount = await Hotel.countDocuments({type:"villa"})
   const cabinCount =await  Hotel.countDocuments({type:"cabin"})
   res.status(200).json([
    {type: "hotel", count: hotelCount},
    {type: "apartment", count: apartmentCount},
    {type: "resort", count: resortCount},
    {type: "villa", count: villaCount},
    {type: "cabin", count: cabinCount},
   ])
}

const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };


module.exports = {
    createHotel,updateHotel, deleteHotel, getHotels, getHotel,countByCity, countByType, getHotelRooms
}