const userModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { find } = require("../../models/user.model");
const { msgErrDatabase } = require("../../constants");

// ---- login --------

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ Message: "Please complete all information!" });

  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser)
      return res
        .status(400)
        .send({ Message: "Email or password is incorrect!" });
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword || findUser.role != 1)
      return res
        .status(400)
        .send({ Message: "Email or password is incorrect!" });

    const token = jwt.sign(
      { id: findUser._id, role: findUser.role },
      process.env.SECRET_KEY
    );
    res.cookie("token", token);
    res.status(200).send({ Message: "Login thanh cong", token });
  } catch (err) {
    res.status(500).send({ ...msgErrDatabase, err });
  }
};
module.exports = { login };
