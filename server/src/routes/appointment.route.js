const router = require("express").Router()
const { authenticate } = require("../utils/authenticate")
const AppointmentController = require("../controllers/appointmentController")

const ac = new AppointmentController()

router.post("/", authenticate(), ac.createAppointment)
router.get("/business", authenticate(), ac.getAppointmentbybusiness)
router.get("/user", authenticate(), ac.getAppointmentbyUser)
router.get("/id/:id", authenticate(), ac.getAppointmentbyId)
router.put("/update/:id", authenticate(), ac.updateAppointmentbyId)
router.get("/business/patients", authenticate(), ac.getPatients)

router.get("/business/booked/time/:phone", ac.getBookedSlots)

module.exports = router
