const express = require("express");

const Post = require("../usecases/postDonation.usecase");

const router = express.Router();

app.post("/", async (req, res) => {
  const donations = await Post.createDonation(req.body);
  res.json(donations);
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
