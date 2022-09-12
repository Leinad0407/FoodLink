require("dotenv").config();
const express = require("express");
const router = require("express").Router();

const multer = require("multer");
const { uploadFile } = require("../lib/s3");

const upload = multer({
  dest: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com`,
});

const ImageProfile = require("../models/userModel");

router.get("/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post("/", upload.single("croppedImage"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  console.log(result);
  await ImageProfile.create({ photoUrl: req.file.path });

  // res.send({ imagePath: `/images/${result.Key}` });
  res.status(200).json({ data: req.file.path });
});

module.exports = router;
