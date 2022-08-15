const Donation = require("../models/postDonation.model");

async function activateDonation(id, DonationInfo) {
  const filter = {
    _id: id,
  };
  await Donation.findOneAndUpdate(filter, DonationInfo);
  const updatedDonation = Donation.findOne(filter);
  console.log(updatedDonation);
  return updatedDonation;
}

async function getBookedDonations(filter) {
  const Donations = await Donation.find(filter);

  return Donations;
}
module.exports = {
  getBookedDonations,
  activateDonation,
};
