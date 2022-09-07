const express = require("express");

const Post = require("../usecases/postDonation.usecase");

const router = express.Router();

router.post("/", async (req, res) => {
  const donations = await Post.createDonation(req.body);
  res.json(donations);
});
//conseguir todas las donaciones que estén activas
router.get("/", async (req, res) => {
  const foodDescription = req.query.foodDescription;
  const address = req.query.address;
  //este es el filtro que nos permite ver donaciones que están activas//
  const filter = { status: "active" };
  if (address != undefined) {
    filter.address = address;
  }
  if (foodDescription != undefined) {
    filter.foodDescription = foodDescription;
  }
  const donations = await Post.getDonations(filter);
  res.json(donations);
});
//conseguir donación unica
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const singleDonation = await Post.detailDonation(id);

  res.json(singleDonation);
});
//conseguir datos de contacto de donador
router.get("/detail/:id/orderReady/:id", async (req, res) => {
  const id = req.params.id;

  const singleDonation = await Post.detailDonation(id);

  res.json(singleDonation);
});
//apartar donación
router.patch("/detail/:id", async (req, res) => {
  console.log("algo pasa");
  const id = req.params.id;
  const DonationInfo = req.body;

  const donations = await Post.updateDonation(id, DonationInfo);
  res.json(donations);
});
//Reemplazar contenido de una donación ya creada
// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);

//   const DonationInfo = req.body;
//   console.log(DonationInfo);

//   const singleDonation = await Post.updateDonation(id, DonationInfo);
//   console.log(singleDonation);

//   res.json(singleDonation);
// });

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   const deletedDonation = await Post.deleteDonation(id);

//   res.json(deletedDonation);
// });

module.exports = router;
