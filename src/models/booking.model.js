const mongoose = require("mongoose");

const Booking = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "tour", required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    numberTicket: { type: Number, required: true },
    timeStart: { type: String, required: true },
    timeOut: { type: String, required: true },
    auth: { type: Number, default: 0 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", Booking);
