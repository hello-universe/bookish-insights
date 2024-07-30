const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const userModel = require("./models/user.model")
const bcrypt = require("bcrypt")

dotenv.config()

//App config

const port = process.env.PORT
const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/addBook"))
app.use(require("./routes/users"))

//DB config
const connection_url = process.env.CONNECTION_URL
mongoose.connect(connection_url)
const db = mongoose.connection
db.on("connected", ()=>{
    console.log("Connected to MongoDB")
    addAdmin()
})
db.on("error", ()=>{
    console.log("Error connecting to MongoDB")
})

//Creating a function to add admin user if not already exists on connecting to database
const addAdmin = async () => {
    let user = await userModel.findOne({userName: "admin"})
    if(user){
        console.log("Admin user already exists")
        return ;
    }
    try{
        user = await userModel.create({
            name: "Admin",
            userName: "admin",
            email: "adminbookishinsights@gmail.com",
            password: bcrypt.hashSync("Admin@123", 10),
            userType: "ADMIN"
        })
        console.log("Admin user added successfully")
        }
        catch(err){
            console.log("Error while adding admin user");
        }
    }


//Routes

app.use("/", (req, res)=>{
    res.status(200).send("Hello from bookish server")
})

//Listener
app.listen(port, () => console.log(`Listening on port: ${port}`))