const { default: mongoose } = require("mongoose");
const { getCompanyDetail } = require("../../commonFunc");
const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const ObjectId = mongoose.Types.ObjectId;

const getAllTours = (req, res) => {
  const companyId = req.id;
  const companyPrepare = getCompanyDetail(
    { _id: ObjectId(companyId) },
    { auth: true, active: true },
    { createdAt: -1 }
  );

  companyPrepare.exec((err, company) => {
    if (err) {
      console.log(err);
      res.status(500).send({ ...msgErrDatabase, err });
    } else if (!company[0]) res.status(204).send({ ...msgErrNoInfo });
    else res.status(200).send({ ...msgSucces, company });
  });
};
module.exports = { getAllTours };
