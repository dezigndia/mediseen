const router = require("express").Router()

const UserController = require("../controllers/userController")
const { authenticate } = require("../utils/authenticate")
const uc = new UserController()

router.get("/", uc.getAllUsers)
router.delete("/", uc.deleteUser)
router.get("/get/info", authenticate(), uc.getUser) //TODO need to add validation

// new
router.post("/user-verify-otp", uc.verifyOtp) //TODO need to add validation
router.post("/user-get-otp", uc.sendOTP) //TODO need to add validation
router.get("/details", authenticate(), uc.getUserDetails) // find business by token
router.put("/", authenticate(), uc.updateUser)

router.post("/general/otp/verify", uc.generalVerifyOtp)
router.post("/general/otp/get", uc.generalSendOTP)

module.exports = router
