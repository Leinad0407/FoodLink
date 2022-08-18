const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
  },
  lastName: {
    type: String,
    minlength: 3,
  },
  address: {
    type: Object,
  },
  // Colonia: {
  //   type: String,
  //   minlength: 3,
  // },
  // Numero: {
  //   type: String,
  //   minlength: 3,
  // },
  // Estado: {
  //   type: String,
  //   minlength: 3,
  // },
  // Ciudad: {
  //   type: String,
  //   minlength: 3,
  // },
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
  phoneNumber: {
    type: Number,
    minlength: 3,
  },
  // Negocio: {
  //   type: String,
  //   minlength: 3,
  // },
  gender: {
    type: String,
    minlength: 3,
  },
  userTyper: {
    type: String,
    minlength: 3,
  },
});
const User = mongoose.model("user", userSchema);

module.exports = User;
