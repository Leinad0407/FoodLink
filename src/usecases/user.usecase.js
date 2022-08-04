const User = require("../models/user.model")
const jwt = require("../lib/jwt.lib")
const bcrypt = require('bcrypt');


const validarRegistro = (Nombre,Apellio,Direccion,Colonia,Numero,Estado, Ciudad, email, password,telefono, genero, userName) => {
  return bcrypt.hash(password, 10)
}

const validarIniciarSesion = async (email, password) => {
  const user = await User.findOne({ email })

  if(!user) throw Error("Correo erroneo")

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) throw Error("Password erroneo")

  const token = jwt.sign({ id: user._id })
  console.log("token", token)

  return token

}

const register = async (data) => {
  // Aqui va toda nuestra
  data["password"] = await validarRegistro(data.email, data.password)
  const userCreated = User.create(data)
  return userCreated
}

const login = async (data) => {
  const token = await validarIniciarSesion(data.email, data.password)
  return token
}


module.exports = { register, login, }