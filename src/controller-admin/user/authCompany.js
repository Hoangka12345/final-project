const { msgErrDatabase, msgSucces, msgSuccesUpdate, msgErrNoInfo } = require("../../constants");
const infoCompanyModel = require("../../models/infoCompany.model");
const userModel = require("../../models/user.model");
const { sendEmail } = require("../../sendEmail");

const authcompany = async (req, res) => {
  const { userId } = req.body;

  const company = await userModel.findById(userId);
  if (!company) {
    res.json(400).send(msgErrNoInfo);
  }

  await infoCompanyModel
    .findOneAndUpdate({ userId }, { auth: true }, { new: true }, async (err, info) => {
      if (err) res.status(500).send({ ...msgErrDatabase });
      else if (info) {
        await sendEmail(
          company.email,
          `Vietnam travel has verified the account information of ${company.username}. From now on, the company can use the account to post activities on Vietnam Travel.`
        );
        res.status(200).send({ ...msgSuccesUpdate, info });
      } else res.status(204).send({ ...msgErrNoInfo });
    })
    .clone();
};

module.exports = {
  authcompany,
};
