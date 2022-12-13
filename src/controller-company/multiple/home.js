const { msgErrDatabase, msgSucces } = require('../../constants')
const userModel = require('../../models/user.model')
const { verifyCompany } = require('../../verify')




const home = ('/', verifyCompany, (req, res) => {
    const { id, role } = req
    userModel.findById(id)
        .then(user => {
            res.status(200).send({ ...msgSucces, user, role });
        })
        .catch((err) => res.status(500).send({ ...msgErrDatabase, err }))
})

module.exports = home