require("dotenv").config();
//Imprtamos paquetes con require
const express = require("express");
const res = require("express/lib/response");
const { get } = require("express/lib/response");
const mongoose = require("mongoose");
const cors = require("cors");

const donationsRouter = require("./routers/index");
const uploadImages = require("./routers/userRoutes");
// const imagesRouter = require("./routers/images.route");
// const imagesRouterS3 = require("./lib/aws-s3");
// const imagesRouterS3_2 = require("./lib/aws-s3(2)");
const { getDonations } = require("./usecases/postDonation.usecase");
//inicializamos constantes con la configuración
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/donations", donationsRouter);
app.use("/users", uploadImages);
// app.use("/api/uploadImage/s3", imagesRouter);
// app.use("/api/uploadImage", imagesRouter);
// app.use("/api/uploadImage-2", imagesRouterS3_2);

mongoose
  .connect(URL)
  .then(() => {
    console.log("Estamos conectados a la base de datos de donaciones");
    app.listen(PORT, () => {
      console.log("Server ejecutandose en el puerto", PORT);
      console.log(getDonations());
    });
  })
  .catch((error) => {
    console.error("Hubo un error:", error);
  });
