const router = require("express").Router()

const BusinessController = require("../controllers/BusinessController")
const bc = new BusinessController()

router.get("/", bc.getBusinessList)

module.exports = router
