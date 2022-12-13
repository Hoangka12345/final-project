const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const userModel = require("../../models/user.model");

const getCompany = (req, res) => {
    const id = req.id
    userModel.aggregate([
        {
            $match: { _id: ObjectId(id) }
        }, {
            $lookup: {
                from: 'infoCompanies',
                localField: '_id',
                foreignField: 'userId',
                as: 'info',
            }
        }
    ]).exec((err, company) => {
        if (err)
            res.status(500).send({ ...msgErrDatabase, err })
        else if (!company[0])
            res.status(204).send({ ...msgErrNoInfo })
        else
            res.status(200).send({ ...msgSucces, company })
    })
}

module.exports = {
    getCompany
};
