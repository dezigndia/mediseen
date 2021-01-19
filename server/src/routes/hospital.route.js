const router = require("express").Router()
const AdminValidator = require("../validator/validators")

const HospitalController = require("../controllers/hospitalController");
const hc = new HospitalController();


router.post("/", hc.createHospital)
router.get("/", hc.getHospitals)
router.get("/:hosId", hc.getHospitalByID)
router.put("/:hosId", hc.updateHospital)
router.delete("/:hosId", hc.deleteHospital)


module.exports = router
