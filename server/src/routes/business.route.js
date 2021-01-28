const router = require("express").Router()

const BusinessController = require("../controllers/businessController")
const bc = new BusinessController()

router.get("/", bc.getBusinessList)
router.get("/category",bc.getBusinessCategory);

module.exports = router
