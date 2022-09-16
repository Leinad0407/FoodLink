const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  photoUrl: String,
});

const ImageFood = mongoose.model("imageFood", userSchema);
module.exports = ImageFood;
