const mongoose = require("mongoose");
//Definir las propiedades en un solo idioma.

//Marcar las propiedades que son obligatorias y las que no.

//Hacer validaciones en el backend

const postDonationSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
    // default: "pasta",
  },
  foodPhoto: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: { Type: String },
  postedDate: {
    type: String,
    required: true,
  },
  expiredDate: {
    type: String,
    required: true,
  },
  foodDescription: { Type: String },
  foodCondition: { Type: String },
  status: {
    type: String,
  },
});

const Donation = mongoose.model("donation", postDonationSchema);

module.exports = Donation;
