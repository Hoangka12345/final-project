const { msgErrMissInfo, msgSuccesAdd, msgErrDatabase } = require('../../constants')
const tourModel = require('../../models/tour.model')
const fs = require('fs/promises');
const path = require('path');

// ------- reemove image ------
const removeImg = (thumbnail) => {
    try {
        fs.rm(path.join(__dirname, '../../uploads/thumbnail/', thumbnail))
    } catch (err) {
        console.log(err);
    }
}

// ------- add tour -------

const test = (req, res) => {

    console.log(req);

    // const thumbnail = req.file.filename

    console.log(req.files);



}


module.exports = { test }