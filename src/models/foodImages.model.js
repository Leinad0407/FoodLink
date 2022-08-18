const mongoose = require("mongoose");

//Definir las propiedades en un solo idioma.

//Marcar las propiedades que son obligatorias y las que no.

//Hacer validaciones en el backend

var foodImagesSchema = new mongoose.Schema({
  imageName: {
    data: Buffer,
    contentType: String,
  },
});

const ImagesFood = mongoose.model("imageFood", foodImagesSchema);

module.exports = ImagesFood;
