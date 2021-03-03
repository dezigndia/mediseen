const router = require("express").Router()

const PharmacyContoller = require("../controllers/pharmacyController")
const pharmacyController = new PharmacyContoller()

router.post("/", pharmacyController.createPharmacy)
router.get("/", pharmacyController.getPharmacies)
router.get("/:pharmacyId", pharmacyController.getPharmacyByID)
module.exports = router
