const mongoose = require("mongoose");

const userDonorSchema = new mongoose.Schema({
  persona: { type: String },
  usuario: { type: String },
  nombre: {
    type: String,
    minlength: 3,
  },
  genero: { type: String },
  apellido: {
    type: String,
    minlength: 3,
  },
  direccion: {
    type: String,
    minlength: 3,
  },
  colonia: {
    type: String,
    minlength: 3,
  },
  numero: {
    type: String,
    minlength: 1,
  },
  estado: {
    type: String,
    minlength: 3,
  },
  ciudad: {
    type: String,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  telefono: {
    type: Number,
    minlength: 3,
  },
  negocio: {
    type: String,
    minlength: 3,
  },
  donation: [{ type: String }],
});

module.exports = mongoose.model("userDonors", userDonorSchema);
