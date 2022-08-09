const Donation = require("../models/postDonation.model");

async function createDonation(donation) {
  const newDonation = new Donation(donation);

  await Donation.create(newDonation);
}

async function getDonations(filter) {
  const Donations = await Donation.find(filter);

  return Donations;
}
async function updateDonation(id, DonationInfo) {
  const filter = {
    _id: id,
  };
  await Donation.findOneAndUpdate(filter, DonationInfo);
  const updatedDonation = Donation.findOne(filter);
  console.log(updatedDonation);
  return updatedDonation;
}

async function deleteDonation(id) {
  const filter = {
    _id: id,
  };
  await Donation.findByIdAndDelete(filter);
  const Donations = await Donation.find(filter);
  return Donations;
}

async function detailDonation(id) {
  const filter = {
    _id: id,
  };

  const singleDonation = await Donation.findById(filter);
  return singleDonation;
}

module.exports = {
  createDonation,
  getDonations,
  updateDonation,
  deleteDonation,
  detailDonation,
};
