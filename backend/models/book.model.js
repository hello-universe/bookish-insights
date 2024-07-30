const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types
const userModel = require("./user.model")

const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "https://i.imghippo.com/files/A82as1721705507.png"
    },
    addedBy: {
        type: ObjectId,
        ref: userModel
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model("Books", bookSchema)