const userModel = require('../../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { msgErrDatabase, msgErrMissInfo, msgErrLogin, msgSuccesLogin } = require('../../constants')


// ---- login --------

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).send(msgErrMissInfo)

    try {
        const findUser = await userModel.findOne({ email })
        if (!findUser)
            return res.status(400).send(msgErrLogin)
        const checkPassword = await bcrypt.compare(password, findUser.password)
        if (!checkPassword || findUser.role != 3)
            return res.status(400).send(msgErrLogin)

        const token = jwt.sign({ id: findUser._id, role: findUser.role }, process.env.SECRET_KEY)
        res.cookie('token', token)
        res.status(200).send({ ...msgSuccesLogin, token })
    } catch (err) {
        res.status(200).send({ ...msgErrDatabase, err })

    }
}
module.exports = login