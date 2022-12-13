const bookingModel = require("../../models/booking.model");
const {
  msgErrDatabase,
  msgErrNoInfo,
  msgSucces,
  msgErrMissInfo,
} = require("../../constants");
const { sendEmail } = require("../../sendEmail");
const tourModel = require("../../models/tour.model");
const userModel = require("../../models/user.model");

// ------ get giá và check vé đủ k và trừ vé có sẵn của tour  -------
// ------ nếu tour off không thể đặt ---------
const getPrice = async (tourId, numberTicket) => {
  const tour = await tourModel.findById(tourId).catch((err) => {
    return { status: false, ...msgErrDatabase };
  });
  if (!tour) return { status: false, ...msgErrNoInfo };
  if (tour.active == false)
    return { status: false, Message: "Tour tạm dừng phục vụ" };
  // if (tour.avaiableTour < numberTicket)
  //     return { status: false, Message: 'Đã hết vé' }
  // const tourUpdate = await tourModel.findByIdAndUpdate(tourId, { avaiableTour: tour.avaiableTour - numberTicket })
  //     .catch(err => { return { status: false, ...msgErrDatabase } })
  // if (!tourUpdate)
  //     return { status: false, ...msgErrNoInfo }
  return { status: true, price: tour.price };
};

const addBooking = async (req, res) => {
  //  ------ check dữ liệu đầu vào ------
  const {
    tourId,
    numberTicket,
    phoneNumber,
    address,
    timeStart,
    timeOut,
    price,
  } = req.body;
  const id = req.id;
  if (
    !tourId ||
    !numberTicket ||
    !phoneNumber ||
    !address ||
    !timeStart ||
    !timeOut ||
    !price
  )
    return res.status(400).send({ ...msgErrMissInfo });

  const tour = await tourModel.findById({ _id: tourId });
  if (!tour) return res.status(400).send({ ...msgErrMissInfo });
  const company = await userModel.findById({ _id: tour.userId });
  if (!company) return res.status(400).send({ ...msgErrMissInfo });
  // ---- them booking ------------
  const newBooking = new bookingModel({
    userId: id,
    tourId,
    phoneNumber,
    timeOut,
    timeStart,
    address,
    numberTicket,
    price,
  });
  newBooking
    .save()
    .then(async (booking) => {
      await sendEmail(
        company.email,
        "Someone has just booked a tour at your company on the VietnamTravel platform"
      );
      await sendEmail(
        "greenwichad123@gmail.com",
        `Someone has just booked a tour at ${company.username}`
      );
      res.status(200).send({ ...msgSucces, booking });
    })
    .catch((err) => {
      res.status(500).send({ ...msgErrDatabase, err });
    });
};

module.exports = {
  addBooking,
};
