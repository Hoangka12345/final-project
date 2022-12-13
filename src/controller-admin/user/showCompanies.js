const { default: mongoose } = require("mongoose");
const userModel = require("../../models/user.model");
const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const ObjectId = mongoose.Types.ObjectId;

const showCompanies = async (req, res) => {
  try {
    const companies = await userModel.find({ role: 2 }).exec();
    if (companies[0]) {
      res.status(200).send({ ...msgSucces, companies });
    }
  } catch (error) {
    res.status(500).send({ ...msgErrDatabase, err });
  }
};
module.exports = { showCompanies };
