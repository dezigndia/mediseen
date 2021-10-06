const router = require("express").Router()

const { loginAdmin } = require("../controllers/adminController")
// const AdminValidator = require("../validator/validators")

const AuthController = require("../controllers/authController")
const AdminValidator = require("../validator/validators")

// const ac = new AdminController()
const auth = new AuthController()

router.post("/admin-login", AdminValidator.validateUser, loginAdmin)

router.post("/user-verify-otp", auth.verifyOtp) //TODO need to add validation
router.post("/user-get-otp", auth.sendOTP) //TODO need to add validation

module.exports = router
