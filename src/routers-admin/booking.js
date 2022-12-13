const { verifyAdmin } = require("../verify");

const { getTotalEachMonth } = require("../controller-admin/booking/getTotalEachMonth");
const { getIncomeEachCompany } = require("../controller-admin/booking/getIncomeEachCompany");
const { getAllBookings } = require("../controller-admin/booking/getAllBookings");

const booking = require("express")();

booking.get("/dashboard", verifyAdmin, getTotalEachMonth);
booking.get("/dashboard-company", verifyAdmin, getIncomeEachCompany);
booking.get("/show", verifyAdmin, getAllBookings);

module.exports = {
  booking,
};
