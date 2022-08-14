const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const ImagesFood = require("../models/foodImages.model");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}`);
      },
    }),
  });

exports.setProfilePic = (req, res, next) => {
  console.log(req.files);

  const uploadSingle = upload(precess.env.S3_BUCKET_NAME).single(
    "croppedImage"
  );

  uploadSingle(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });
    await ImagesFood.create({ foodPhoto: req.file.location });
    console.log(req.file);
    res.status(200).json({ data: req.file.location });
  });
};
