const bcrypt = require("bcrypt");

const DEFAULT_SALT_ROUNDS = 10;

function encrypt(password) {
  return bcrypt.hash(password, DEFAULT_SALT_ROUNDS);
}

module.exports = {
  encrypt,
  ...bcrypt,
};
