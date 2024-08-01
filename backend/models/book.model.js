const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userModel = require("./user.model");


const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    review: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://i.imghippo.com/files/A82as1721705507.png",
    },
    ratings: [
      //ratings is an array of objects where each object stores the user who rated the book and the rating the user gives
      {
        user: {
          type: ObjectId,
          ref: userModel,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    addedBy: {
      type: ObjectId,
      ref: userModel,
    },
  },
  { timestamps: true, versionKey: false }
);

//Function to calculate the average rating of a book
bookSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((total, rating) => {
      return total + rating.rating;
    }, 0);
    this.averageRating = sum / this.ratings.length;
  } else this.averageRating = 0;
  return this.save();
};

module.exports = mongoose.model("Books", bookSchema);
