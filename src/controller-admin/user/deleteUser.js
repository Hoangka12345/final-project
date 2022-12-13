const { default: mongoose } = require("mongoose");
const userModel = require("../../models/user.model");
const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const ObjectId = mongoose.Types.ObjectId;

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.deleteOne({ _id: userId }).exec();
    if (user) {
      res.status(200).send({ ...msgSucces, user });
    }
  } catch (error) {
    res.status(500).send({ ...msgErrDatabase, err });
  }
};
module.exports = { deleteUser };
