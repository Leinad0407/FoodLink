// require("dotenv").config();
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const express = require("express");

var AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const express = require("express");
const router = express.Router();
require("dotenv").config();

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const S3_BUCKET = process.env.S3_BUCKET_NAME;

router.post("/", async (req, res) => {
  const s3 = new AWS.S3();
  const fileName = "croppedImage";

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: "image/jpeg",
    ACL: "public-read",
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    res.json({ success: true, data: { returnData } });
  });
});

module.exports = router;

// module.exports = router;
