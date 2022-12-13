const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const userModel = require("../../models/user.model");

const getAdmin = (req, res) => {
    const id = req.id
    userModel.findById(id, (err, user) => {
        if (err)
            res.status(500).send({ ...msgErrDatabase, err })
        else if (!user)
            res.status(204).send({ ...msgErrNoInfo })
        else
            res.status(200).send({ ...msgSucces, user })


    })
}

module.exports = {
    getAdmin
};
