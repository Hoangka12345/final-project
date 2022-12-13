const jwt = require("jsonwebtoken");
const { msgErrNoPermission } = require("./constants");

const verify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).send({ Message: "Chưa đăng nhập" });

  try {
    const checkToken = jwt.verify(token, process.env.SECRET_KEY);
    if (checkToken) {
      req.id = checkToken.id;
      req.role = checkToken.role;
      next();
    }
  } catch (err) {
    res.status(500).send({ Message: "Lỗi token", err });
  }
};
const verifyUser = (req, res, next) => {
  verify(req, res, () => {
    if (req.role === 1) next();
    else res.status(400).send(msgErrNoPermission);
  });
};

const verifyCompany = (req, res, next) => {
  verify(req, res, () => {
    if (req.role === 2) next();
    else res.status(400).send(msgErrNoPermission);
  });
};

const verifyAdmin = (req, res, next) => {
  verify(req, res, () => {
    if (req.role === 3) next();
    else res.status(400).send(msgErrNoPermission);
  });
};

module.exports = {
  verify,
  verifyAdmin,
  verifyCompany,
  verifyUser,
};
