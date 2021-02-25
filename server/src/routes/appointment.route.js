const router = require("express").Router()
const { authenticate } = require("../utils/authenticate")
const AppointmentController = require("../controllers/appointmentController")

const ac = new AppointmentController()

router.post("/", authenticate(), ac.createAppointment)
router.get("/buisness", authenticate(), ac.getAppointmentbyBuisness)
router.get("/user", authenticate(), ac.getAppointmentbyUser)
router.get("/id/:id", authenticate(), ac.getAppointmentbyId)
router.put("/update/:id", authenticate(), ac.updateAppointmentbyId)

module.exports = router

//TODO
/*
7. Dump all data

1. Category listing
3. Sales
5. Prescription image in appointment

*/
