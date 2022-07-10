const Donation = require("../models/postDonation.model");

async function createDonation(donation) {
  const newDonation = new Donation(donation);

  await Donation.create(newDonation);
}

async function getDonations() {
  const donations = fetch("xxxx");
  const parsedDonations = JSON.parse(donations);

  return parsedDonations;
}

module.exports = {
  createDonation,
  getDonations,
};
