const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userModel = require("../models/user.model")
const requireLogin = require("../middlewares/requireLogin")

router.get("/users", (req, res)=>{
    res.status(200).send("Hello from auth")
})

router.post("/signup", async (req, res)=>{
    const {name, userName, email, password} = req.body

    //Checking the condition if user had filled all the fields
    if(!name || !userName || !email || !password){
        return res.status(400).json({message: "Please fill out all required fields."})
    }

    //Check if user with same userName or email already exist in the database
    const checkUserName = await userModel.findOne({userName : userName})
    
    if(checkUserName){
        return res.status(400).json({message: "User with same User Name already exists"})
    }
    
    const checkEmail = await userModel.findOne({email : email})

    if(checkEmail){
        return res.status(400).json({message: "User with same email already exists"})
    }

    //Hashing password using bcrypt before storing it to database
    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = new userModel({
        name,
        userName,
        email,
        password: hashedPassword
    })
    user.save().then(user => {res.json({message: "Registered successfully"})})
    .catch(err => console.log(err))
})

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please fill out all required fields."})
    }
    const user = await userModel.findOne({email : email})
    if(user==null){
        return res.status(400).json({message: "User does not exist"})
    }
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if(!isValidPassword){
        return res.status(401).json({message: "Please enter a valid password"})
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.status(200).json({message: "Logged in successfully.", token: token})
})

router.get("/createPost", requireLogin, (req, res)=>{
    console.log("Hello from auth")
})

module.exports = router