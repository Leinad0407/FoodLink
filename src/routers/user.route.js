const express = require("express")
const { register, login, subirComida } = require("../usecases/user.usecase")
const { auth } = require("../middlewares/auth.middleware")
const router = express.Router();

router.post("/", async (request, response) => {

  console.log("body", request.body)
  try {
    const user = await register(request.body)

    response.status(201)
    response.json({
      success: true,
      data: {
        user
      }
    })
  }catch(err) {
    response.status(400)
    response.json({
      success: false,
      message: err.message
    })
  }
})

router.post("/auth", async (request, response) => {
  try {
    const token = await login(request.body)
    response.status(201)
    response.json({
      success: true,
      data: {
        token
      }
    })
  }catch(err) {
    response.status(401)
    response.json({
      success: false,
      message: err.message
    })
  }
})
module.exports = router