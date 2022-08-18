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
  // Mensaje de error en caso de que se ingrese datos incorrectos
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
//Validacion de inicio de sesion ingresando correo y contrasena

const login = async (data) => {
  const token = await validarIniciarSesion(data.email, data.password);
  return token;
};
async function createUser(user) {
  const newUser = new User(user);

  await User.create(newUser);
}

module.exports = { register, login, createUser };
