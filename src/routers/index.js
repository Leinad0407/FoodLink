const express = require("express");

const Post = require("../usecases/postDonation.usecase");

const router = express.Router();

router.post("/", async (req, res) => {
  const newDonation = await Post.createDonation(req.body);

  res.json(newDonation);
});

router.get("/", async (req, res) => {
  const filter = {};
  const donations = await Post.getDonations(filter);

  res.json(donations);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  // const DonationInfo = await res;
  // console.log(DonationInfo);
  const singleDonation = await Post.detailDonation(id);
  console.log(singleDonation);

  res.json(singleDonation);
});

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   const deletedDonation = await Post.deleteDonation(id);

//   res.json(deletedDonation);
// });

module.exports = router;
