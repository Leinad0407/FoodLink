const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  photoUrl: String,
});

const ImageProfile = mongoose.model("ImageProfile", userSchema);
module.exports = ImageProfile;
