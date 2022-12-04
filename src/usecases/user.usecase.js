const User = require("../models/user.donor.model");
const { encrypt, compare } = require("../lib/encryptor");
const { sign } = require("../lib/jwt");

function getAll() {
  return User.find();
}

async function createUser({
  persona,
  usuario,
  nombre,
  genero,
  apellido,
  direccion,
  colonia,
  numero,
  estado,
  ciudad,
  email,
  password,
  telefono,
  negocio,
  donation,
}) {
  const encryptedPassword = await encrypt(password);

  return User.create({
    persona,
    usuario,
    nombre,
    genero,
    apellido,
    direccion,
    colonia,
    numero,
    estado,
    ciudad,
    email,
    password: encryptedPassword,
    telefono,
    negocio,
    donation,
  });
}

async function login({ email, password }) {
  const userFound = await User.findOne({ email }); //Encuentra a un usuario por su correo

  if (!userFound) throw new Erro("User not found");
  const encryptedPassword = userFound.password;
  const isCorrectPassword = await compare(password, encryptedPassword);
  if (!isCorrectPassword) throw new Error("Wrong password");

  const token = sign({ id: userFound._id }); //se debe pasar un obajeto (para autentificacion)
  return token;
}

module.exports = {
  getAll,
  createUser,
  login,
};
