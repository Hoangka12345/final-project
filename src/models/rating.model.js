const mongoose = require("mongoose");

const Rating = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "tour", required: true },
    rate: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rating", Rating);
