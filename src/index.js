require("dotenv").config();
//Imprtamos paquetes con require
const express = require("express");
const res = require("express/lib/response");
const { get } = require("express/lib/response");
const mongoose = require("mongoose");

const postsRouter = require("./routers/post.router");
//inicializamos constantes con la configuración
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());


app.use("/posts", postsRouter);

mongoose
  .connect(URL)
  .then(() => {
    console.log(
      "Estamos conectados a la base de datos de donaciones
    );
    app.listen(PORT, () => {
      console.log("Server ejecutandose en el puerto", PORT);
    });
  })
  .catch((error) => {
    console.error("Hubo un error:", error);
  });