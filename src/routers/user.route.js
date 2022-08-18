const express = require("express");
// const {
//   register,
//   login,
//   subirComida,
//   createUser,
// } = require("../usecases/user.usecase");
// const { auth } = require("../middlewares/auth.middleware");
const router = express.Router();

const User = require("../usecases/user.usecase");

router.post("/", async (req, res) => {
  try {
    console.log("si jala esto");
    const users = await User.createUser(req.body);

    res.status(200);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/auth", async (request, response) => {
  try {
    const token = await login(request.body);
    response.status(201);
    response.json({
      success: true,
      data: {
        token,
      },
    });
  } catch (err) {
    response.status(401);
    response.json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
