const userModel = require("../../models/user.model");
const InfoModel = require("../../models/infoCompany.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const infoCompanyModel = require("../../models/infoCompany.model");
const { msgErrDatabase, msgErrMissInfo, msgErrLogin, msgSuccesLogin } = require("../../constants");

// ---- login --------

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ ...msgErrMissInfo });

  const userPrepare = userModel.aggregate([
    { $match: { email } },
    {
      $lookup: {
        from: "infocompanies", // collection name in db
        localField: "_id",
        foreignField: "userId",
        as: "infoCompany",
      },
    },
  ]);

  try {
    // ------ check login -----------
    let company = await userPrepare.exec();
    company = company[0];
    if (!company) return res.status(400).send({ ...msgErrLogin });

    const checkPassword = await bcrypt.compare(password, company.password);
    if (!checkPassword || company.role != 2) return res.status(400).send({ ...msgErrLogin });

    // ----- check tài khoản xác thực chưa -----------
    if (company.infoCompany[0].auth === false)
      return res.status(400).send({ Message: "Your account is being verified!" });

    const token = jwt.sign({ id: company._id, role: company.role }, process.env.SECRET_KEY);
    res.cookie("token", token);
    res.status(200).send({ ...msgSuccesLogin, token });
  } catch (err) {
    res.status(500).send({ ...msgErrDatabase, err });
  }
};
module.exports = login;
