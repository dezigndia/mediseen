const router = require("express").Router()

const BusinessController = require("../controllers/businessController")
const bc = new BusinessController()
const { authenticate } = require("../utils/authenticate")

router.post("/", bc.createNewBusiness) // create new business

router.get("/", bc.getBusinessList) // get all business list as array
router.get("/count", bc.getBusinessCount) // get all business list as array

router.get("/find/", bc.getBusinessByPhoneNumber) // find business by phoneNumber
router.get("/details/", authenticate(), bc.getBusinessDetails) // find business by token
router.put("/update/", authenticate(), bc.updateBusiness) // update my business with token
router.delete("/delete/", authenticate(), bc.deleteBusiness) // delete business with token

router.put("/:status/doctor/:hosPh/doctor/:docId", authenticate(), bc.acceptDoctor)
router.put("/:status/doctor/:hosPh/doctor/:docId", authenticate(), bc.acceptDoctor)
router.get("/pending/requests", authenticate(), bc.getPendingRequests)

module.exports = router
