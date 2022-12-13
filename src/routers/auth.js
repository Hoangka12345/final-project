const { login } = require("../controller/auth/login");
const { register } = require("../controller/auth/register");
const { update } = require("../controller/auth/update");
const { getUser } = require("../controller/auth/getUser");
const { sendFeedback } = require("../controller/auth/sendFeedback");
const { uploadAvatar } = require("../uploads/uploadImage");
const { verifyUser } = require("../verify");

const auth = require("express")();

auth.post("/login", login);
auth.post("/register", uploadAvatar, register);
auth.put("/update", verifyUser, update);
auth.get("/show", verifyUser, getUser);
auth.post("/send-mail", verifyUser, sendFeedback);

module.exports = auth;
