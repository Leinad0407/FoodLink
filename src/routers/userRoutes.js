const express = require("express");
const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const { uploadFile } = require("../lib/s3");
const upload = multer({ dest: "uploads/" });

router.get("/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);

  res.send({ imagePath: `/images/${result.Key}` });
});

module.exports = router;
