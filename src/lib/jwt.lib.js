const jwt = require("jsonwebtoken")

const { JWT_SECRET } = process.env

const sign = (payload = {}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" })
}

const verify = (token) => {
  return jwt.verify(token, JWT_SECRET)
  //Verificacion del usuario
}

module.exports = { sign, verify }