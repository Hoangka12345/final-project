const { default: mongoose } = require("mongoose");
const feedbackModel = require("./models/feedback.model");
const tourModel = require("./models/tour.model");
const userModel = require("./models/user.model");
const ObjectId = mongoose.Types.ObjectId;

// ----------- show tour -------------
const showTour = (match, sort) => {
  const tourPrepare = tourModel.aggregate([
    {
      $addFields: {
        duration: { $toInt: { $arrayElemAt: [{ $split: ["$time", " "] }, 0] } },
        // document: "$$ROOT",
      },
    },
    {
      $match: {
        ...match,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "company",
        pipeline: [{ $project: { username: 1, avatar: 1, role: 1 } }],
      },
    },
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "tourId",
        as: "booking",
        pipeline: [
          {
            $group: {
              _id: "$tourId",
              totalOrders: { $sum: "$numberTicket" },
              totalPrice: { $sum: { $multiply: ["$numberTicket", "$price"] } },
            },
          },
        ],
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$booking", 0] }, "$$ROOT"],
        },
      },
    },
    {
      $project: {
        booking: 0,
      },
    },
    { $sort: sort },
  ]);

  return tourPrepare;
};

// -------------- show tour detail ------------
const showTourDetail = (tourId) => {
  const tourPre = tourModel.aggregate([
    {
      $match: { _id: ObjectId(tourId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "company",
        pipeline: [{ $project: { username: 1, avatar: 1, role: 1 } }],
      },
    }, // ----------- tinhs doanh thu của mỗi tour và số vé tuor đã bán -------
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "tourId",
        as: "booking",
        pipeline: [
          {
            $group: {
              _id: "$tourId",
              totalOrders: { $sum: "$numberTicket" },
              totalPrice: { $sum: { $multiply: ["$numberTicket", "$price"] } },
            },
          },
        ],
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$booking", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { booking: 0 } },
  ]);
  const feedbackPrepare = feedbackModel.aggregate([
    { $match: { tourId: ObjectId(tourId) } },
    { $sort: { createdAt: -1 } },
    // ------ check whether array is empty or not ------------
    {
      $addFields: {
        replyFeedback: {
          $cond: {
            if: { $eq: [{ $size: "$replyFeedback" }, 0] },
            then: "1",
            else: "$replyFeedback",
          },
        },
      },
    },
    // ----- unwind array need to lookup -------
    { $unwind: "$replyFeedback" },
    {
      $lookup: {
        from: "users",
        let: {
          replyFeedback: "$replyFeedback",
          reply: "$replyFeedback",
          userId: "$userId",
        },
        // -------- match and move data from field replyFeedback to field detail ------
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$replyFeedback.userId"] } } },
          { $project: { username: 1, avatar: 1, role: 1, _id: 0 } },
          {
            $replaceRoot: { newRoot: { $mergeObjects: ["$$reply", "$$ROOT"] } },
          },
        ],
        as: "detail",
      },
    },

    // final group detail into inital replyfeedback field
    {
      $group: {
        _id: "$_id",
        replyFeedback: { $push: { $first: "$detail" } },
        userId: { $first: "$userId" },
        createdAt: { $first: "$createdAt" },
        content: { $first: "$content" },
        tourId: { $first: "$tourId" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: { username: 1, avatar: 1, role: 1, createdAt: 1 },
          },
        ],
      },
    },
  ]);

  return { tourPre, feedbackPrepare };
};

// ----------- get info company detail -----------
const getCompanyDetail = (matchUser, matchTour, sortTour) => {
  const companyPrepare = userModel.aggregate([
    { $match: matchUser },
    {
      $lookup: {
        from: "infocompanies",
        localField: "_id",
        foreignField: "userId",
        as: "info",
        pipeline: [
          {
            $addFields: { operate: { $subtract: [new Date(), "$createdAt"] } },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "tours",
        localField: "_id",
        foreignField: "userId",
        as: "tours",
        pipeline: [
          { $sort: sortTour },
          { $match: matchTour },
          // ----------- tinhs doanh thu của mỗi tour và số vé tuor đã bán -------
          {
            $lookup: {
              from: "bookings",
              localField: "_id",
              foreignField: "tourId",
              as: "booked",
              pipeline: [
                {
                  $group: {
                    _id: "$tourId",
                    totalOrders: { $sum: "$numberTicket" },
                    totalPrice: {
                      $sum: { $multiply: ["$numberTicket", "$price"] },
                    },
                  },
                },
              ],
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{ $arrayElemAt: ["$booking", 0] }, "$$ROOT"],
              },
            },
          },
          { $project: { booking: 0 } },
        ],
      },
    },
  ]);
  return companyPrepare;
};

const showCompany = (match, sort) => {
  const companyPre = userModel.aggregate([
    { $match: { role: 2 } },
    {
      $lookup: {
        from: "infocompanies",
        localField: "_id",
        foreignField: "userId",
        as: "info",
      },
    },
    { $match: match },
    { $sort: sort },
  ]);

  return companyPre;
};

const getUserDetail = (match, sort) => {
  const userPre = userModel.aggregate([
    { $match: match },
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "userId",
        as: "booked",
      },
    },
    { $sort: sort },
  ]);

  return userPre;
};

module.exports = {
  showTour,
  getCompanyDetail,
  showTourDetail,
  showCompany,
  getUserDetail,
};
