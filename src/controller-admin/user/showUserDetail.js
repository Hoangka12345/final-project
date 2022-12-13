const { default: mongoose } = require("mongoose");
const { getUserDetail } = require("../../commonFunc");
const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const ObjectId = mongoose.Types.ObjectId;

const showUserDetail = (req, res) => {
  const userId = req.params.userId;
  const userPrepare = getUserDetail({ _id: ObjectId(userId) }, { auth: 1, createdAt: -1 });

  userPrepare.exec((err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({ ...msgErrDatabase, err });
    } else if (!user[0]) res.status(204).send({ ...msgErrNoInfo });
    else res.status(200).send({ ...msgSucces, user });
  });
};
module.exports = { showUserDetail };
