const router = require("express").Router()

const BusinessController = require("../controllers/businessController")
const bc = new BusinessController()

router.get("/", bc.getBusinessList)

module.exports = router
