const express = require("express")
const router = express.Router()
const userModel = require("../models/user.model")
const bookModel = require("../models/book.model")
const requireLogin = require("../middlewares/requireLogin")
const upload = require("../middlewares/multer.middleware")
const uploadOnCloudinary = require("../utils/cloudinary")

router.get("/user", requireLogin, async(req, res)=>{
    res.status(200).json({user: req.user});
})
router.get("/profile", requireLogin, async (req, res)=>{
    try{
        const books = await bookModel.find({addedBy: req.user._id}).sort({createdAt: -1})
        res.status(200).json({user: req.user, books: books})
    }
    catch(err){
        res.status(500).json({message: "Error while getting user or books", error: err})
    }
})
router.get("/users/:userName", async (req, res)=>{
    const {userName} = req.params
    try{
        const user = await userModel.findOne({userName: userName}).select("-password")
        if(user){
            const books = await bookModel.find({addedBy: user._id})
            res.status(200).json({user: user, books: books})
        }
        else{
            res.status(404).json({message: "User not found"})
        }
    }
    catch(err){
        res.status(500).json({message: "Error while getting user", error: err})
    }
})

//Route to update profile picture
router.put("/profile/updatepic", [requireLogin, upload.single("image"), async (req, res)=>{
    try{
        const user = req.user
        if(!req.file){
            return res.status(400).json({message: "Please upload an image"})
        }
        const uploadedImg = await uploadOnCloudinary(req.file.path)
        user.image = uploadedImg.url
        await user.save()
        res.status(200).json({message: "Profile picture updated successfully", user: user})
    }
    catch(err){
        res.status(500).json({message: "Error while updating profile picture", error: err})
    }
}])
module.exports = router