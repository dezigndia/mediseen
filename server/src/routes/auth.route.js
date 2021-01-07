const router = require("express").Router()
const AdminValidator = require("../middlewares/validators")

const AdminController = require("../controllers/adminController")
const ac = new AdminController()

const TwilioController = require("../controllers/twilioController")
const tc = new TwilioController()

router.post("/login", tc.login)
router.post("/verify", tc.verify)
router.post("/admin-login", AdminValidator.validateUser, ac.login)

module.exports = router
