const router = require("express").Router()

const DoctorController = require("../controllers/doctorController")
const dc = new DoctorController()

router.post("/", dc.createDoctor)

module.exports = router
