const mongoose = require("mongoose");
//Definir las propiedades en un solo idioma.

//Marcar las propiedades que son obligatorias y las que no.

//Hacer validaciones en el backend

const postDonationSchema = new mongoose.Schema({
  userID: String,
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
  phoneNumber: String,
  tags: {
    type: String,
    required: true,
  },
  postedDate: {
    type: String,
    required: true,
  },
  foodDescription: String,
  foodCondition: String,
});

const Donation = mongoose.model("donation", postDonationSchema);

module.exports = Donation;
