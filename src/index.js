require("dotenv").config();
//Imprtamos paquetes con require
const express = require("express");
const res = require("express/lib/response");
const { get } = require("express/lib/response");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routers/user.route");
const donationsRouter = require("./routers/index");
const uploadImages = require("./routers/userRoutes");
const foodImages = require("./routers/foodImage");

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

app.use("/users", userRouter);
app.use("/donations", donationsRouter);
// app.use("/users", uploadImages);
app.use("/imagesFood", foodImages);

mongoose
  .connect(URL)
  .then(() => {
    console.log("Estamos conectados a la base de datos de donaciones");
    app.listen(PORT, () => {
      console.log("Server ejecutandose en el puerto", PORT);
    });
  })
  .catch((error) => {
    console.error("Hubo un error:", error);
  });
