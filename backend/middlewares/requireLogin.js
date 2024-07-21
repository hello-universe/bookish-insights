const jwt = require("jsonwebtoken")
const jwt_secret = process.env.JWT_SECRET
const userModel = require("../models/user.model")


module.exports = (req, res, next)=>{
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(401).json({message: "Please login first"})
    }
    jwt.verify(token, jwt_secret, async (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "Token expired. Please login again."})
        }
        const user = await userModel.findOne({_id: decoded.id})
        if(!user){
            return res.status(401).json({message: "User does not exist"})
        }
        res.status(200).json({message: "User validated"})
        next()
    })
}