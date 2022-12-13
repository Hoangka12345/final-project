const userModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const {
  msgErrMissInfo,
  msgSuccesUpdate,
  msgErrDatabase,
  msgErrNoInfo,
  msgErrEmailValidate,
  msgErrEmailAvai,
} = require("../../constants");
const path = require("path");

// ------- reemove image ------
const removeImg = async (file) => {
  if (file)
    try {
      await fs.rm(path.join(__dirname, "../../uploads/avatar/", file.filename));
    } catch (err) {
      console.log(err);
    }
};

// ----- update ----------
const update = async (req, res) => {
  const userId = req.id;
  const { password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.findById(userId);
  if (!user) {
    res.status(204).send({ ...msgErrNoInfo });
  }

  let avatar = user.avatar;
  let username = user.username;
  let email = user.email;
  let phoneNumber = user.phoneNumber;
  if (!avatar || !phoneNumber || !username || !email || !hashPassword) {
    return res.status(400).send(msgErrMissInfo);
  }

  await userModel
    .findByIdAndUpdate(
      userId,
      {
        avatar,
        username,
        email,
        password: hashPassword,
        phoneNumber,
      },
      { new: true }
    )
    .then((user) => {
      if (!user) res.status(204).send({ ...msgErrNoInfo });
      else res.status(200).send({ ...msgSuccesUpdate, user });
    });
};

module.exports = { update };
