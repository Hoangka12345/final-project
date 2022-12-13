const { verifyCompany } = require("../verify");
const { authBooking } = require("../controller-company/booking/auth");
const { showBooking } = require("../controller-company/booking/show");
const { getTotalEachMonth } = require("../controller-company/booking/getTotalEachMonth");
const { getTotalEachTour } = require("../controller-company/booking/getTotalEachTour");

const booking = require("express")();

booking.put("/auth/:bookingId", verifyCompany, authBooking);
booking.get("/show", verifyCompany, showBooking);
booking.get("/dashboard", verifyCompany, getTotalEachMonth);
booking.get("/dashboard-tour", verifyCompany, getTotalEachTour);

module.exports = {
  booking,
};
