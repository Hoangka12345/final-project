const mongoose = require("mongoose");

const replyFeedback = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Feedback = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "tour" },
    content: { type: String, required: true },
    replyFeedback: [replyFeedback],
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", Feedback);
