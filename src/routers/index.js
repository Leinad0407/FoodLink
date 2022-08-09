const express = require("express");

const Post = require("../usecases/postDonation.usecase");

const router = express.Router();

router.post("/", async (req, res) => {
  const newDonation = await Post.createDonation(req.body);

  res.json(newDonation);
});

router.get("/", async (req, res) => {
  const foodDescription = req.query.foodDescription;
  const address = req.query.address;
  const filter = {};
  if (address != undefined) {
    filter.address = address;
  }
  if (foodDescription != undefined) {
    filter.foodDescription = foodDescription;
  }
  const donations = await Post.getDonations(filter);
  res.json(donations);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const DonationInfo = req.body;
  const updatedDonation = await Post.updateDonation(id, DonationInfo);

  res.json(updatedDonation);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deletedDonation = await Post.deleteDonation(id);

  res.json(deletedDonation);
});

module.exports = router;
