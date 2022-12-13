const path = require('path');
const test = require('express')()

test.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/showImg.html'))
})

module.exports = {
    test
};
