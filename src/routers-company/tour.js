const tour = require("express")();
const { search } = require("../controller-company/tour/search");
const { tourDetail } = require("../controller-company/tour/tourDetail");
const { addTour } = require("../controller-company/tour/add");
const { getAllTours } = require("../controller-company/tour/getAllTours");
const { verifyCompany } = require("../verify");
const { updateTour } = require("../controller-company/tour/update");
const { uploadThumbnail } = require("../uploads/uploadImage");
const { changeActive } = require("../controller-company/tour/changeActive");
const { delTour } = require("../controller-company/tour/del");
const { test } = require("../controller-company/tour/test");
const path = require("path");

tour.post("/add", verifyCompany, uploadThumbnail, addTour);
tour.post("/test", uploadThumbnail, test);
tour.get("/viewtest", (req, res) => {
  res.sendFile(path.join(__dirname, "../controller-company/test/test.html"));
});
tour.put("/update", verifyCompany, uploadThumbnail, updateTour);
tour.put("/changeactive", verifyCompany, changeActive);
tour.put("/del", verifyCompany, delTour);
// tour.get("/search", verifyCompany, search);
tour.get("/show", verifyCompany, getAllTours);
tour.get("/show/:id", verifyCompany, tourDetail);

module.exports = tour;
