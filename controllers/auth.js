const User = require("../models/User.js")
const bcryptjs = require("bcryptjs")
const createError = require("../utils/errorHandler.js")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const register = async(req,res,next) =>{
    try {

        const salt = bcryptjs.genSaltSync(10)
        const hashedPassword = bcryptjs.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        await newUser.save()
        res.status(200).send("User has been created")
    } catch (error) {
        next(error)
    }
}

const login = async(req,res,next)=>{
    try {
        const user =await User.findOne({username: req.body.username})
        if(!user){
            return next(createError(404, "User not found"))
        }
        const isPasswordCorrect = await bcryptjs.compare(req.body.password,user.password)
        if(!isPasswordCorrect){
            return next(createError(400, "Wrong Password or Username"))
        }

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY)
        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200).json({details:{...otherDetails}, isAdmin})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}