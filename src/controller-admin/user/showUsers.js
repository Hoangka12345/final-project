const { default: mongoose } = require("mongoose");
const userModel = require("../../models/user.model");
const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const ObjectId = mongoose.Types.ObjectId;

const showUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: 1 }).exec();
    if (users[0]) {
      res.status(200).send({ ...msgSucces, users });
    }
  } catch (error) {
    res.status(500).send({ ...msgErrDatabase, err });
  }
};
module.exports = { showUsers };
