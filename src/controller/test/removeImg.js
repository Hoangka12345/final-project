const fs = require('fs/promises');
const path = require('path');

const removeImg = (req, res) => {
    fs.rm(path.join(__dirname + '../../../uploads/avatar/avt-1658829121483'))

}

module.exports = {
    removeImg
};
