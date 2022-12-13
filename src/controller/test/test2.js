const path = require('path');

const test2 = (req, res) => {
    res.sendFile(path.join(__dirname + '/test.html'))
}

module.exports = {
    test2
};
