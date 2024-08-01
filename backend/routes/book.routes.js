const express = require("express");

const router = express.Router();
const bookModel = require("../models/book.model");
const requireLogin = require("../middlewares/requireLogin");
const upload = require("../middlewares/multer.middleware");
const uploadOnCloudinary = require("../utils/cloudinary");

// Your routes and other middleware

// Route to add a new book
router.post(
  "/profile/addbook",
  [requireLogin, upload.single("image")],
  async (req, res) => {
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
  }
);

//To get all books
router.get("/books", requireLogin, async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error while getting books", error: err });
  }
});

//Route to get info of a single book based on its bookId as parameter
router.get("/books/:bookId", async (req, res) => {
  try {
    const book = await bookModel
      .findById(req.params.bookId)
      .populate({ path: "addedBy", select: "-password" }).populate({path: "reviews.user", select: "-password"});
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Error while getting book", error: err });
  }
});

//Routes to rate the book
router.put("/books/:bookId/rate", requireLogin, async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const { userId, rating } = req.body;
    //Check if user has already rated the book
    const existingRating = book.ratings.find((rating) => rating.user == userId);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      book.ratings.push({ user: userId, rating: rating });
    }
    await book.calculateAverageRating();
    await book.save();
    res.status(200).json({ message: "Book rated successfully", book: book });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while rating book", error: err });
  }
});

//Route to give review to a book

  router.put("/books/:bookId/review", requireLogin, async (req, res)=>{
    try{
        const book = await bookModel.findById(req.params.bookId).populate({path: "reviews.user", select: "-password"})
        if(!book){
          return res.status(404).json({message: "Book not found"})
        }
        const {userId, review} = req.body;
        book.reviews.push({review: review, user: userId})
        await book.save()
        res.status(200).json({message: "Review added successfully", book: book})
    }
    catch(err){
        res.status(500).json({message: "Error while rating book", error: err})
    }
  })

module.exports = router;
