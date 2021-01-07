const router = require("express").Router()

const DoctorController = require("../controllers/doctorController")
const dc = new DoctorController()

router.post("/", dc.createDoctor)
router.get("/", dc.getDoctors)
router.get("/:docId", dc.getDoctorByID)
router.put("/:docId", dc.updateDoctor)
router.delete("/:docId", dc.deleteDoctor)

module.exports = router
