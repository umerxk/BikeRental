const mongoose = require("mongoose");

const Bike = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "Bike model is required"],
    },
    color: {
      type: String,
      required: [true, "Bike color is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    rating: {
      type: Number,
      default: null
    },
    description: {
        type: String,
    },
    created_at: { type: Date, default: Date.now },
  }
);

const modal = mongoose.model("Bike", Bike);

module.exports = modal;
