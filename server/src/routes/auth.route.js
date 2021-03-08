const router = require("express").Router()

// const AdminValidator = require("../validator/validators")

const AdminController = require("../controllers/adminController")
const AuthController = require("../controllers/authController")
const AdminValidator = require("../validator/validators")

// const ac = new AdminController()
const auth = new AuthController()

router.post("/admin-login", AdminValidator.validateUser, AdminController.loginAdmin)

router.post("/user-verify-otp", auth.verifyOtp) //TODO need to add validation
router.post("/user-get-otp", auth.sendOTP) //TODO need to add validation

module.exports = router
