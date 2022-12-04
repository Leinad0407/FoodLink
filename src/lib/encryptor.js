const bcrypt = require("bcrypt");

const DEFAULT_SALT_ROUNDS = 10; //Numero de veces que se encryptara la contraseña

function encrypt(password) {
  return bcrypt.hash(password, DEFAULT_SALT_ROUNDS); //Encripta la contraseña el numero de veces de la ronda de sal
}

module.exports = {
  encrypt,
  ...bcrypt, //Obtenemos todas las propiedades de bcrypt debido a que se va a comparar posteriormente
};
