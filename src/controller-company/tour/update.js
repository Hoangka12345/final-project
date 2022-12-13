const {
  msgSuccesUpdate,
  msgErrNoInfo,
  msgErrDatabase,
  msgErrMissInfo,
} = require("../../constants");
const tourModel = require("../../models/tour.model");
// const fs = require("fs");
const fs = require("fs/promises");
const path = require("path");

const removeThumbnail = async (files) => {
  const thumbnails = files.thumbnail;
  if (thumbnails) {
    thumbnails.forEach((thumbnail) => {
      const thumbnailPath = thumbnail.path;
      fs.rm(thumbnailPath);
    });
  }
};

// ------- add tour -------
const updateTour = async (req, res) => {
  // ---- lấy thông tin từ req ------
  const id = req.id;
  const {
    tourId,
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
  // -------- get thumbnail ---------
  const tourFind = await tourModel.findById(tourId);
  if (!tourFind) {
    removeThumbnail(req.files);
    return res.status(400).send(msgErrNoInfo);
  }
  let thumbnail = tourFind.thumbnail ? tourFind.thumbnail : [];

  // ------- check info --------
  if (
    !tourId ||
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
    !price ||
    !avaiableTour ||
    !totalTour ||
    !saleOff ||
    !category ||
    !accompanyingService ||
    !introContent
  ) {
    removeThumbnail(req.files);
    return res.status(400).send({ ...msgErrMissInfo });
  }
  // ------- check tour update image? ---------
  if (req.files.thumbnail) {
    try {
      await Promise.all(
        thumbnail.map(async (file) => {
          const thumbnailPath = `src\\uploads\\thumbnail\\${file}`;
          await fs.rm(thumbnailPath);
        })
      );
    } catch (error) {
      console.log(error);
    }

    const files = [];
    for (let i = 0; i < req.files.thumbnail.length; i++) {
      files.push(req.files.thumbnail[i].filename);
    }
    // --------- gắn tên ảnh vào thumbnail ----------
    thumbnail = files;
  }

  // -------- update với userid === companyId ------
  tourModel.findOneAndUpdate(
    { _id: tourId, userId: id },
    {
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
      thumbnail,
    },
    { new: true },
    (err, tour) => {
      if (err) {
        removeThumbnail(req.files);
        return res.status(500).send({ ...msgErrDatabase, err });
      } else if (!tour) {
        removeThumbnail(req.files);
        res.status(204).send({ ...msgErrNoInfo });
      } else {
        res.status(200).send({ ...msgSuccesUpdate, tour });
      }
    }
  );
};

module.exports = { updateTour };
