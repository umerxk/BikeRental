const mongoose = require("mongoose");

const Reservation = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bike"
    },
    startDate: Date,
    endDate: Date,
    rating: {
      type: Number,
      default: null
    },
    created_at: { type: Date, default: Date.now },
  }
);

const modal = mongoose.model("Reservation", Reservation);

module.exports = modal;
