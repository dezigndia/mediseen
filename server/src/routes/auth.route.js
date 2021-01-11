const router = require("express").Router()
const AdminValidator = require("../validators")

const UserController = require("../controllers/userController");
const uc = new UserController();

const TwilioController = require("../controllers/twilioController")
const tc = new TwilioController()

router.post("/login", tc.login)
router.post("/verify", tc.verify)
router.post("/admin-login", AdminValidator.validateUser,  uc.login);

module.exports = router
