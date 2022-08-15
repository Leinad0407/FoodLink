const express = require("express");

const booked = require("../usecases/profile.js");

const router = express.Router();

router.get("/bookedDonations", async (req, res) => {
  //este es el filtro que nos permite ver donaciones que están activas//
  const filter = { status: "booked" };

  const donations = await booked.getBookedDonations(filter);
  console.log(donations);
  res.json(donations);
});

module.exports = router;
