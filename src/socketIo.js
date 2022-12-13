const feedbackModel = require("./models/feedback.model");
const ratingModel = require("./models/rating.model");
const tourModel = require("./models/tour.model");
const { msgErrDatabase, msgSuccesAdd, msgErrMissInfo } = require("./constants");

const handleSocketEvent = (io) => {
  io.on("connection", (socket) => {
    socket.on("comment", (data) => {
      const { username, userId, tourId, content, avatar } = data;

      feedbackModel.create({ userId, tourId, content }, (err, feedback) => {
        if (err) {
          console.log(err);
        }
      });

      data.createdAt = new Date();
      socket.broadcast.emit("comment", {
        username,
        content,
        avatar,
        createdAt: data.createdAt,
      });
    });

    socket.on("rating", async (data) => {
      const { tourId } = data;
      const tour = await tourModel.findById(tourId);
      if (tour) {
        const ratings = await ratingModel.find({ tourId });
        socket.broadcast.emit("rating", { rating: tour.rate, ratings });
      }
    });
  });
};

module.exports = {
  handleSocketEvent,
};
