require("dotenv").config();

const multer = require("multer");
const express = require("express");
var CryptoJS = require("crypto-js");
const sharp = require("sharp");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const {
  getSignedUrl,
  S3RequestPresigner,
} = require("@aws-sdk/s3-request-presigner");

const ImagesFood = require("../models/foodImages");

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;

const s3 = new S3Client({
  credentials: {
    accesKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  region: S3_BUCKET_REGION,
});

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/upload", upload.single("image"), async (req, res) => {
  const posts = await ImagesFood.findMany({
    orderBy: [{ creagted: "desc" }],
  });

  for (const post of post) {
    const getObjectParams = {
      Bucket: S3_BUCKET_NAME,
      Key: post.imageName,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, {
      expiresIn: 60,
    });
    post.imageUrl = url;
  }
  res.send(posts);
});

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);

  //resize image

  const buffer = await sharp(req.file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();

  const imageName = randomImageName();
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: imageName,
    Body: buffer,
    ContenType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);

  const post = await ImagesFood.create({
    data: {
      caption: req.body.caption,
      imageName: imageName,
    },
  });

  res.send(post);
});

app.delete("/upload/:id", async (req, res) => {
  const id = +req.params.id;

  const post = await ImagesFood.posts.findUnique({ where: { id } });
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: post.imageName,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);

  await ImagesFood.posts.delete({ where: { id } });

  res.send(post);
});

app.listen(8080, () => console.log("Listening on the port 8080"));
