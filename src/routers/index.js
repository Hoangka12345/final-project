const { conversation } = require("./conversation");
const { feedback } = require("./feedback");
const { booking } = require("./booking");
const home = require("../controller/multiple/home");
const auth = require("./auth");
const tour = require("./tour");
const { test } = require("../controller/test");
const user = require("express")();
const path = require("path");
const { uploadAvatar } = require("../uploads/uploadImage");

user.use("/", home);
user.use("/", auth);
user.use("/tour", tour);
user.use("/booking", booking);
user.use("/feedback", feedback);
user.use("/conversation", conversation);
user.use("/test", test);

module.exports = user;
