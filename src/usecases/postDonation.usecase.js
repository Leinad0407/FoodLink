const Donation = require("../models/postDonation.model");

async function createDonation(donation) {
  const newDonation = new Donation(donation);

  await Donation.create(newDonation);
}

async function getDonations(filter) {
  // const donations = fetch("xxxx");
  const Donations = await Donation.find(filter);
  return Donations;
}
async function updateDonation(id, DonationInfo) {
  const filter = {
    _id: id,
  };
  await Donation.findOneAndUpdate(filter, DonationInfo);
  const updatedDonation = Donation.findOne(filter);
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

module.exports = {
  createDonation,
  getDonations,
  updateDonation,
  deleteDonation,
};
