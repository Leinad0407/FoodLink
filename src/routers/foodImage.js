require("dotenv").config();
const express = require("express");
const router = require("express").Router();

const multer = require("multer");
const { uploadFile, getFileStream } = require("../lib/foodImages3");

const upload = multer({
  dest: `https://${process.env.S3_BUCKET_NAME_FOOD}.s3.${process.env.S3_BUCKET_REGION_FOOD}.amazonaws.com`,
});

const imageFood = require("../models/foodImages");

router.get("/", async (req, res) => {
  // console.log(req.params);
  // const key = req.params.key;
  // const readStream = getFileStream(key);
  // readStream.pipe(res);
  const food = await imageFood.find({});
  res.json(food);
  console.log(food);
});

router.post("/", upload.single("newFile"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  console.log(result);
  await imageFood.create({ photoUrl: req.file.path });

  // res.send({ imagePath: `/images/${result.Key}` });
  res.status(200).json({ data: req.file.path });
});

router.delete("/", (req, res) => {
  console.log(`File deleted`);
  return res.status(200).json({ result: true, msg: "file deleted" });
});

module.exports = router;
