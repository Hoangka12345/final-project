const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Tour = Schema(
  {
    userId: { type: ObjectId, required: true },
    title: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    time: { type: String, required: true },
    dateStart: { type: String, required: true },
    code: { type: String, required: true },
    transport: { type: String, required: true },
    service: [{ type: String, required: true }],

    program: [
      {
        content: { type: String, required: true },
        note: { type: String, required: true },
      },
    ],
    price: { type: Number, required: true },
    avaiableTour: { type: Number, required: true },
    totalTour: { type: Number, required: true },
    saleOff: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    auth: { type: Boolean, default: true },
    active: { type: Boolean, default: true },

    introduction: { type: String, required: true },
    category: { type: String, required: true },
    accompanyingService: [{ type: String, required: true }],
    introContent: [{ type: String, required: true }],
    thumbnail: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("tour", Tour);
