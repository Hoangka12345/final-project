const auth = require("./auth");
const feedback = require("./feedback");
const { booking } = require("./booking");
const home = require("../controller-admin/multiple/home");
const { tour } = require("./tour");
const { user } = require("./user");
const admin = require("express")();

admin.use("/", home);
admin.use("/", auth);
admin.use("/tour", tour);
admin.use("/user", user);
admin.use("/feedback", feedback);
admin.use("/booking", booking);

module.exports = admin;
