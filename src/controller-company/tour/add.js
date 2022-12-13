const {
  msgErrMissInfo,
  msgSuccesAdd,
  msgErrDatabase,
} = require("../../constants");
const { sendEmail } = require("../../sendEmail");
const tourModel = require("../../models/tour.model");
const userModel = require("../../models/user.model");
const fs = require("fs");

// ------- reemove image ------
const removeThumbnail = (thumbnails) => {
  try {
    for (let i = 0; i < thumbnails.length; i++) {
      fs.unlinkSync(thumbnails[i].path);
    }
  } catch (err) {
    console.log(err);
  }
};

// ------- add tour -------

const addTour = async (req, res) => {
  // -------- check file ảnh upload ---------
  if (!req.files) return res.status(400).send({ Message: "Vui long chọn ảnh" });
  // -------- gắn tên ảnh vào thumbnail ---------
  const thumbnail = [];

  const files = req.files.thumbnail;
  for (let i = 0; i < files.length; i++) {
    thumbnail.push(files[i].filename);
  }
  // ---- lấy thông tin từ req ------
  const { id } = req;
  const {
    title,
    city,
    region,
    time,
    dateStart,
    code,
    transport,
    introduction,
    service,
    program,
    price,
    avaiableTour,
    totalTour,
    saleOff,
    category,
    accompanyingService,
    introContent,
  } = req.body;

  // get company information
  const company = userModel.findById({ id });
  if (!company) {
    return res.status(400).send({ Message: "cannot find company" });
  }

  // ----- check info ---------
  if (
    !title ||
    !city ||
    !region ||
    !time ||
    !dateStart ||
    !code ||
    !transport ||
    !introduction ||
    !service ||
    !program ||
    !thumbnail ||
    !price ||
    !avaiableTour ||
    !totalTour ||
    !saleOff
  ) {
    removeThumbnail(files);
    return res.status(400).send(msgErrMissInfo);
  }
  // ------- tạo mới tuor ------------
  const newTour = new tourModel({
    userId: id,
    title,
    city,
    region,
    time,
    dateStart,
    code,
    transport,
    introduction,
    service: JSON.parse(service),
    program: JSON.parse(program),
    thumbnail,
    price,
    avaiableTour,
    totalTour,
    saleOff,
    category,
    accompanyingService: JSON.parse(accompanyingService),
    introContent: JSON.parse(introContent),
  });
  newTour
    .save()
    .then(async (tour) => {
      await sendEmail(
        "greenwichad123@gmail.com",
        `${company.username} just created a new tour!`
      );
      res.status(200).send({ ...msgSuccesAdd, tour });
    })
    .catch((err) => {
      removeThumbnail(files);
      res.status(500).send({ ...msgErrDatabase, err });
    });
};

module.exports = { addTour };
