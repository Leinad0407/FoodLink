const express = require("express");
const router = express.Router();
const User = require("../usecases/user.usecase");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    const allUsers = await User.getAll();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = req.body;

    const createdUser = await User.createUser(newUser);
    res.statusCode = 201;
    res.json(createdUser);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginInfo = req.body;
    const token = await User.login(loginInfo);
    res.json({
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    console.error(error);

    if (
      error.message === "User not found" ||
      error.message === "Wrong password"
    ) {
      res.statusCode = 400;
    } else {
      res.statusCode = 500;
    }

    res.json(error);
  }
});

module.exports = router;
