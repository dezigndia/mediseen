const router = require("express").Router()

const DoctorController = require("../controllers/doctorController")
const doctorValidator = require("../doctor")
const dc = new DoctorController()

router.get("/", dc.getDoctors)
router.post("/", doctorValidator.validateDoctor, dc.createDoctor)
router.get("/:docId", dc.getDoctorByID)
router.put("/:docId", dc.updateDoctor)
router.delete("/:docId", dc.deleteDoctor)

module.exports = router
