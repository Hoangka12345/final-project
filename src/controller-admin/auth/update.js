const userModel = require('../../models/user.model')
const bcrypt = require('bcrypt')
const fs = require('fs/promises');
const { msgErrMissInfo, msgSuccesUpdate, msgErrDatabase, msgErrNoInfo, msgErrEmailValidate, msgErrEmailAvai } = require('../../constants');
const path = require('path');

// ------- reemove image ------
const removeImg = (file) => {
    if (file)
        try {
            fs.rm(path.join(__dirname, '../../uploads/avatar/', file.filename))
        } catch (err) {
            console.log(err);
        }
}

// ----- update ----------
const update = async (req, res) => {

    // -------- get avatar ---------
    const id = req.id
    const user = await userModel.findById(id)
    if (!user)
        return res.status(400).send(msgErrNoInfo)
    let avatar = user.avatar

    // ------ laasy thông tin tử client -
    const { username, email, password, phoneNumber } = req.body
    if (!username || !email || !password || !phoneNumber) {
        removeImg(req.file)
        return res.status(400).send(msgErrMissInfo)
    }
    const check = /\S+@\S+\.\S+/
    if (!check.test(email)) {

        return res.status(400).send(msgErrEmailValidate)
    }

    try {
        // ---------- kiểm tra email tồn tại chưa -----
        const findUser = await userModel.findOne({ email, _id: { $ne: id } })
        if (findUser) {
            removeImg(req.file)
            return res.status(400).send(msgErrEmailAvai)
        }
        const hashPassword = await bcrypt.hash(password, 10)

        // ------- check admin update image? ---------
        if (req.file) {
            try {
                await fs.rm(path.join(__dirname, '../../uploads/avatar/', avatar))
            } catch (err) {
                console.log(err);
            }
            // --------- gắn tên ảnh vào avatar ----------
            avatar = req.file.filename
        }
        // --------- update --------
        await userModel.findByIdAndUpdate(id, { username, email, password: hashPassword, avatar, phoneNumber }, { new: true })
            .then((user) => {
                if (!user)
                    res.status(204).send({ ...msgErrNoInfo })
                else
                    res.status(200).send({ ...msgSuccesUpdate, user })
            })

    } catch (err) {
        removeImg(req.file)
        res.status(500).send({ ...msgErrDatabase, err })
    }
}

module.exports = { update }