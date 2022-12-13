const mongoose = require("mongoose");

const InfoCompany = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    address: [{ type: String }],
    auth: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("infoCompany", InfoCompany);
