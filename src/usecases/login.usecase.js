const User = require("../models/user.model");
const { encrypt, compare } = require("../lib/encryptor");
const { sign } = require("../lib/jwt");

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
router.post("/login", async (req, res) => {
  try {
    const loginInfo = req.body;
    //console.log(loginInfo);
    const token = await User.login(loginInfo);
    const info = await User.getUser(loginInfo);

    res.json({
      success: true,
      data: {
        token,
        info,
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

    res.json({ error });
  }
});

module.exports = router;
