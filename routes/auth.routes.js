const authController = require("../controllers/auth.controller")
const router = require("express").Router()

router.post("/signUp", authController.signUp)
router.post("/login", authController.login)


module.exports = router