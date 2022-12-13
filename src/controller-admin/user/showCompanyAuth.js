const { showCompany } = require("../../commonFunc");
const { msgSucces, msgErrNoInfo, msgErrDatabase } = require("../../constants");
const showCompanyAuth = async (req, res) => {
  const companyPre = showCompany({ info: { $elemMatch: { auth: true } } }, { createdAt: -1 });
  try {
    const companies = await companyPre.exec();
    if (companies[0]) res.status(200).send({ ...msgSucces, companies });
    else res.status(204).send({ ...msgErrNoInfo });
  } catch (err) {
    res.status(500).send({ ...msgErrDatabase, err });
  }
};

module.exports = {
  showCompanyAuth,
};
