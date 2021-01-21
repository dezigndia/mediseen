const router = require("express").Router()

const DoctorController = require("../controllers/doctorController")
const doctorValidator = require("../doctor") //FIXME add validator again
const dc = new DoctorController()

router.get("/", dc.getDoctors)
router.post("/", dc.createDoctor)
router.get("/:docId", dc.getDoctorByID)
router.put("/:docId", dc.updateDoctor)
router.delete("/:docId", dc.deleteDoctor)
router.get("/:docId/availableHos",dc.getAvailableHosList)


module.exports = router
