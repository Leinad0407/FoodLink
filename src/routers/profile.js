const express = require("express");

const booked = require("../usecases/profile.js");

const router = express.Router();

router.get("/bookedDonations", async (req, res) => {
  //este es el filtro que nos permite ver donaciones que están activas//
  const filter = { status: "booked" };

  const donations = await booked.getBookedDonations(filter);

  res.json(donations);
});

router.patch("/bookedDonations/:id", async (req, res) => {
  const id = req.params.id;
  const DonationInfo = req.body;

  const donations = await booked.activateDonation(id, DonationInfo);
  res.json(donations);
});

module.exports = router;
