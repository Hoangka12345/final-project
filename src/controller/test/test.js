const test = require('express')()
const { uploadImage } = require('../../uploads/uploadImage');


const upload = uploadImage('avatar')
test.post("/uploadphoto", upload.single('avt'), (req, res) => {
    if (!req.file)
        return res.status(200).send({ Message: 'Vui long chọn ảnh' })

    return res.status(200).send({ file: req.file.filename })



})

module.exports = {
    test
};


// test.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
// })

// test.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
// })

// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// test.post('/cool-profile', cpUpload, function (req, res, next) {
//     // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body will contain the text fields, if there were any
// })
