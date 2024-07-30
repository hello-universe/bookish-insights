const express = require("express");

const router = express.Router();
const bookModel = require("../models/book.model");
const requireLogin = require("../middlewares/requireLogin");
const upload = require("../middlewares/multer.middleware");
const uploadOnCloudinary = require("../utils/cloudinary");

router.post("/profile/addbook", [requireLogin, upload.single("image")], async (req, res) => {
  const { name, author, description, category } = req.body;
  const user = req.user;
  if (!name || !author || !category || !description) {
    return res
      .status(400)
      .json({ message: "Please fill out all required fields." });
  } else {
    // console.log(req.file);
    const bookObj = {
      name: name,
      author: author,
      description: description,
      category: category,
      addedBy: user,
    };
    if (req.file) {
      const uploadedImg = await uploadOnCloudinary(req.file.path);
      bookObj.image = uploadedImg.url;
    }
    const addedBook = new bookModel(bookObj);
    addedBook
      .save()
      .then((addedBook) => {
        res
          .status(201)
          .json({ message: "Book added successfully", book: addedBook });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error while adding book", error: err });
      });
  }
});

//To get all books
router.get("/books", requireLogin, async (req, res) => {
    try{
        const books = await bookModel.find()
        res.status(200).json(books)
    }
    catch(err){
        res.status(500).json({message: "Error while getting books", error: err})
    }
})

router.get("/books/:bookId", async (req, res)=>{
    try{
        const book = await bookModel.findById(req.params.bookId).populate("addedBy")
        res.status(200).json(book)
    }
    catch(err){
        res.status(500).json({message: "Error while getting book", error: err})
    }
})

module.exports = router;
