const router = require("express").Router()

const BusinessController = require("../controllers/businessController")
const bc = new BusinessController()
const { authenticate } = require("../utils/authenticate")

router.post("/", bc.createNewBusiness) // create new business

router.get("/", bc.getBusinessList) // get all buisness list as array
router.get("/category", bc.getBusinessCategory) // get all buisness categories as array  FIXME categories

router.get("/find/", bc.getBusinessByPhoneNumber) // find buisness by phoneNumber
router.get("/details/", authenticate(), bc.getBusinessDetails) // find buisness by token
router.put("/update/", authenticate(), bc.updateBusiness) // update my buisness with token
router.delete("/delete/", authenticate(), bc.deleteBusiness) // delete buisness with token

module.exports = router
