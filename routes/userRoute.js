const express = require("express")
const { updateUser, deleteUser, getUser, getAllUser } = require("../controllers/user")
const {verifyToken, verifyUser,verifyAdmin} = require("../utils/verifyToken")

const router = express.Router()

// router.get("/checkAuthentication", verifyToken, (req,res,next)=>{
//     res.send("hello user you are logged in")
// })
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello user you are logged in and you can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("hello user you are logged in and you can delete all account")
// })

// UPDATE
router.put("/:id",verifyUser, updateUser)
// DELETE
router.delete("/:id",verifyUser, deleteUser)
// GET
router.get("/:id",verifyUser, getUser)
// GET ALL
router.get("/",verifyAdmin, getAllUser)

module.exports = router