const mongoose = require("mongoose");
//Definir las propiedades en un solo idioma.

//Marcar las propiedades que son obligatorias y las que no.

//Hacer validaciones en el backend

const foodImagesSchema = new mongoose.Schema({
  foodPhoto: {
    type: String,
    required: true,
  },
});

const ImagesFood = mongoose.model("imageFood", foodImagesSchema);

module.exports = ImagesFood;
