const express = require("express");

const Post = require("../usecases/postDonation.usecase");

const router = express.Router();

router.post("/", async (req, res) => {
  const newDonation = await Post.createDonation(req.body);

  res.json(newDonation);
});

router.get("/", async (req, res) => {
  const donations = await Post.getDonations();

  res.json(donations);
});

module.exports = router;
