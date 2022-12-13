const { msgErrDatabase } = require('../../constants')
const userModel = require('../../models/user.model')
const { verifyAdmin } = require('../../verify')

const home = require('express')()


home.get('/', verifyAdmin, (req, res) => {
    const { id, role } = req
    userModel.findById(id)
        .then(user => {
            res.status(200).send({ user, role });
        })
        .catch((err) => res.status(500).send({ ...msgErrDatabase, err }))
})

module.exports = home