const { msgErrDatabase, msgErrMissInfo, msgSuccesUpdate, msgErrNoInfo } = require("../../constants");
const userModel = require("../../models/user.model");

const delAdmin = (req, res) => {
    const id = req.id
    const { adminId } = req.body
    if (!adminId)
        return res.status(400).send({ ...msgErrMissInfo })

    if (id == adminId)
        return res.status(400).send({ Message: 'Bạn ơi đừng xoá nữa, nhà mình còn đâu' })
    userModel.findByIdAndUpdate(adminId, { role: 1 }, (err, user) => {
        if (err)
            res.status(500).send({ ...msgErrDatabase, err })
        else if (!user)
            res.status(204).send({ ...msgErrNoInfo })
        else
            res.status(200).send({ ...msgSuccesUpdate })
    })
}

module.exports = {
    delAdmin
};
