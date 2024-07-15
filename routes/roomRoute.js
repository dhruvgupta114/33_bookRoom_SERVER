const express = require("express");
const {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,updateRoomAvailability
} = require("../controllers/room.js");
const { verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);
// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
// GET
router.get("/:id", getRoom);
// GET ALL
router.get("/", getAllRoom);

module.exports = router;
