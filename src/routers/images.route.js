require("dotenv").config();
const express = require("express");
const multer = require("multer");
var AWS = require("aws-sdk");
const router = express.Router();

// const {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
// } = require("@aws-sdk/client-s3");
// const { S3 } = require("aws-sdk");
// var CryptoJS = require("crypto-js");
// const sharp = require("sharp");

// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// // router.post("/", async (req, res) => {
// //   const imagesUpload = await post.createImage(req.body);
// //   res.json(imagesUpload);

// //   const objectImage = req.body; //objeto de Js

// //   const newImage = new ImagesFood(objectImage); //Instancia del modelo upload
// //   upload.create(newImage);

// //   await ImagesFood.create(newImage);
// // });

// const randomImagesName = (bytes = 32) =>
//   CryptoJS.randomBytes(bytes).toString("hex");

// const BUCKET = process.env.S3_BUCKET;
// const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
// const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
// const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;

// const s3 = new S3Client({
//   credentials: {
//     accesKeyId: S3_ACCESS_KEY,
//     secretAccessKey: S3_SECRET_ACCESS_KEY,
//   },
//   region: S3_BUCKET_REGION,
// });

// const storage = multer.memoryStorage();

// router.get("/", async (req, res) => {
//   const posts = await ImagesFood.find({
//     orderBy: [{ created: "desc" }],
//   });
//   for (const post of posts) {
//     //Generador de URLS
//     const getObjectParams = {
//       Bucket: BUCKET,
//       Key: post.imageName,
//     };
//     const command = new GetObjectCommand(getObjectParams);
//     const url = await getSignedUrl(s3, command, { expiresIn: 60 });
//     post.imageUrl = url; //generete url
//   }

//   res.send(posts);
// });

// router.post("/", upload.single("image"), async (req, res) => {
//   console.log("req.file", req.file);
//   console.log("req.file", req.body);

//   //resize image
//   const buffer = await sharp(req.file.buffer)
//     .resize({ height: 1920, width: 1080, fit: "contain" })
//     .toBuffer();

//   const params = {
//     Bucket: BUCKET,
//     Key: randomImagesName,
//     Body: buffer,
//     ContentType: req.file.mimetype,
//     ACL: "public-read",
//   };
//   const command = new PutObjectCommand(params);

//   await s3.send(command);

//   const post = await ImagesFood.create({
//     //subimos las imagenes a la BD
//     data: {
//       imageName: imageName,
//     },
//   });

//   res.send(post);
// });

// router.delete("/", async (req, res) => {
//   const id = +req.params.id;
//   const post = await ImagesFood.find({ where: { id } });
//   if (!post) {
//     res.status(404).send("El post no fué encontrado");
//     return;
//   }
//   res.send({});
// });

AWS.config.update({
  region: process.env.S3_BUCKET_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const BUCKET = process.env.S3_BUCKET_NAME;

router.post("/", async (req, res) => {
  const s3 = new AWS.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  const folder = req.body.folder;

  const s3Params = {
    Bucket: BUCKET,
    Key: "file",
    Expires: 500,
    ContentType: fileType,
    ACL: "public-read",
  };
  console.log(s3Params);

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }

    const returnData = {
      signedRequest: data,
      url: `https://${BUCKET}.s3.amazonaws.com/${folder}/${fileName}`,
    };
    res.json({ success: true, data: { returnData } });
  });
});

router.delete("/", (req, res) => {
  console.log("La imagen fué borrada");
  return res.status(200).json({ result: true, msg: "archivo borrado" });
});

// router.get("/", async (req, res) => {
//   const posts = await ImagesFood.find({
//     orderBy: [{ created: "desc" }],
//   });
//   for (const post of posts) {
//     //Generador de URLS
//     const getObjectParams = {
//       Bucket: BUCKET,
//       Key: "image.jpg",
//     };
//     const command = new GetObjectCommand(getObjectParams);
//     const url = await getSignedUrl(s3, command, { expiresIn: 60 });
//     post.imageUrl = url; //generete url
//   }
// }

//Preguntar

storage = multer.memoryStorage();

const maxSize = 1920 * 1080 * 5;
var upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
});

module.exports = router;
