const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxLenght: [100, "product name cannot exeed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLenght: [5, "product name cannot exeed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessoiries",
        "Sports wear",
        "Food",
        "Books",
        "Clothes",
        "Sports shoes",
      ],
      message: "Please select correct category for product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLenght: [5, "Product stock cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", productSchema);
