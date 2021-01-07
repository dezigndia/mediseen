const router = require("express").Router()

const TwilioController = require("../controllers/twilioController")
const tc = new TwilioController()

router.post("/login", tc.login)
router.post("/verify", tc.verify)

module.exports = router
