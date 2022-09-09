require("dotenv").config();
var AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Set the Region

AWS.config.update({
  region: process.env.S3_BUCKET_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, "image.jpeg");
      },
    }),
  });

exports.setProfilePic = (req, res, next) => {
  console.log(req.files);

  const uploadSingle = upload("profilepicturefoodlink").single("croppedImage");

  uploadSingle(req, res, (err) => {
    if (err)
      return res.status(400).json({ succes: false, message: err.message });
    console.log(req.file);
    res.status(200).json({ data: req.file });
  });
};
