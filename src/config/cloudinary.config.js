const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ["jpg", "png"],
  },
});

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (err, res) => {
        if (err) return res.status(500).send("upload image error");
        console.log(res);
        resolve({
          res: res.secure_url,
        });
      },
      {
        folder: "thumbnailFolder",
        use_filename: true,
      }
    );
  });
};

const uploadCloud = multer({ storage });

module.exports = { cloudinaryImageUploadMethod, uploadCloud };
