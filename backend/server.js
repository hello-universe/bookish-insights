const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

//App config

const port = process.env.PORT
const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(require("./routes/auth"))

//DB config
const connection_url = process.env.CONNECTION_URL
mongoose.connect(connection_url)
const db = mongoose.connection
db.on("connected", ()=>{
    console.log("Connected to MongoDB")
})
db.on("error", ()=>{
    console.log("Error connecting to MongoDB")
})

//Routes

app.use("/", (req, res)=>{
    res.status(200).send("Hello from bookish server")
})

//Listener
app.listen(port, () => console.log(`Listening on port: ${port}`))