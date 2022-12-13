const { default: mongoose } = require('mongoose')
const { getCompanyDetail } = require('../../commonFunc')
const { msgErrDatabase, msgErrNoInfo, msgSucces } = require('../../constants')
const ObjectId = mongoose.Types.ObjectId

const show = (req, res) => {
    const id = req.id
    const companyPrepare = getCompanyDetail({ '_id': ObjectId(id) }, {}, { 'auth': 1, 'createdAt': -1 })
    companyPrepare.exec((err, company) => {
        if (err) {
            console.log(err);
            res.status(500).send({ ...msgErrDatabase, err })
        }
        else if (!company[0])
            res.status(204).send({ ...msgErrNoInfo })
        else
            res.status(200).send({ ...msgSucces, company })
    })
}
module.exports = { show }