const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        minlength: 3
      },
    Apellido: {
        type: String,
        minlength: 3
      },
    Direccion: {
        type: String,
        minlength: 3
      },
    Colonia: {
        type: String,
        minlength: 3
      },
    Numero: {
        type: String,
        minlength: 3
      },
    Estado: {
        type: String,
        minlength: 3
      },
    Ciudad: {
        type: String,
        minlength: 3
      },
    email: {
        type: String,
        required: true,
        unique: true
  },
    password: {
        type: String,
        required: true,
        minlength: 3
  },
    Telefono: {
        type: Number,
        minlength: 3
  },
    Negocio: {
        type: String,
        minlength: 3
  },
    Genero: {
        type: Radio,
        minlength: 3
  },
    userName: {
        type: String,
        minlength: 3
  },
  
})

module.exports = mongoose.model("users", userSchema)