const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const userModel = require("../models/user.model")

router.get("/users", (req, res)=>{
    res.status(200).send("Hello from aut")
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

router.post("/login", (req, res)=>{
    const { email, password } = req.body;
    
})

module.exports = router