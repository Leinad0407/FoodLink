const User = require("../models/user.model");
// const jwt = require("../lib/jwt.lib");
// const bcrypt = require("../lib/encryptor");

const validarRegistro = (
  Nombre,
  Apellido,
  Direccion,
  Colonia,
  Numero,
  Estado,
  Ciudad,
  email,
  password,
  telefono,
  genero,
  userName
) => {
  return bcrypt.hash(password, 10);
};

const validarIniciarSesion = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw Error("Correo erroneo");

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw Error("Password erroneo");

  const token = jwt.sign({ id: user._id });
  console.log("token", token);

  return token;
};

const register = async (data) => {
  // Aqui va toda nuestra
  data["password"] = await validarRegistro(data.email, data.password);
  const userCreated = User.create(data);
  return userCreated;
};

// const login = async (data) => {
//   const token = await validarIniciarSesion(data.email, data.password);
//   return token;
// };
async function createUser(user) {
  const newUser = new User(user);

  await User.create(newUser);
}
// Aqui empezará el login y auth
async function login({ username, password }) {
  const userFound = await User.findOne({ username });

  if (!userFound) throw new Error("User not found");

  const encryptedPassword = userFound.password;
  const isCorrectPassword = await compare(password, encryptedPassword);

  if (!isCorrectPassword) throw new Error("Wrong password");

  const token = sign({ id: userFound._id });
  return token;
}

async function getUser({ username, password }) {
  const userFound = await User.findOne({ username });

  if (!userFound) throw new Error("User not found");

  const encryptedPassword = userFound.password;
  const isCorrectPassword = await compare(password, encryptedPassword);

  if (!isCorrectPassword) throw new Error("Wrong password");

  const token = {
    id: userFound._id,
    userName: userFound.username,
    userCategory: userFound.userType,
    userRestaurant: userFound.restaurants,
  };
  return token;
}

module.exports = { register, login, createUser, getUser };
