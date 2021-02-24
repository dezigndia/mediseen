const router = require("express").Router()

const PharmacyContoller = require("../controllers/pharmacyController")
const pharmacyController = new PharmacyContoller()

router.post("/", pharmacyController.createPharmacy)
router.get("/", pharmacyController.getPharmacies)
router.get("/:pharmacyId", pharmacyController.getPharmacyByID)

router.get("/product/categories", pharmacyController.getPharmacyProductCategories) //FIXME roles
router.get("/staff/roles", pharmacyController.getPharmacyStaffRoles) //FIXME roles

module.exports = router
