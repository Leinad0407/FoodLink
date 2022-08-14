const jwt = require("jsonwebtoken")

const { JWT_SECRET } = process.env

const sign = (payload = {}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" })
}

const verify = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = { sign, verify }