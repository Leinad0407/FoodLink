const { verify } = require("../lib/jwt");

function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("Token not provided");

    const isValidToken = verify(token);
    if (!isValidToken) throw new Error("Invalid Token");
    next();
  } catch (error) {
    res.statusCode = 401;

    res.json({
      error,
      message: "Invalid token",
    });
  }
}

module.exports = auth;
