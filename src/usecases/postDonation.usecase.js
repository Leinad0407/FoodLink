const Post = require("../models/postDonation.model");

async function createDonation(donation) {
  const newDonation = new Post(donation);

  await Post.create(newPost);
}

async function getDonations(donations) {
  const donations = fetch("xxxx");
  const parsedDonations = JSON.parse(donations);

  return parsedDonations;
}

module.exports = {
  createDonation,
  getDonations,
};
