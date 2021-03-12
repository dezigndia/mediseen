const express = require("express")
const {
    addAdmin,
    removeAdmin,
    getAdmins,
    getProducts,
    getUsers,
    getTotalUsers,
    getTotalBusinesses,
    getBusinessList,
    getOrders,
} = require("../controllers/adminController")
const { isSuperAdmin, isAdmin } = require("../utils/adminHelper")
const BusinessController = require("../controllers/businessController")
const AppointmentController = require("../controllers/appointmentController")

const bc = new BusinessController()
const ac = new AppointmentController()
const router = express.Router()

router.post("/add-admin", isSuperAdmin(), addAdmin)
router.post("/remove-admin", isSuperAdmin(), removeAdmin)
router.get("/get-admins", isSuperAdmin(), getAdmins)
router.get("/get-products", isAdmin(), getProducts)
router.get("/get-users", isAdmin(), getUsers)
router.get("/get-businesses", isAdmin(), getBusinessList)
router.get("/get-total-users", isAdmin(), getTotalUsers)
router.get("/get-total-businesses", isAdmin(), getTotalBusinesses)
router.get("/get-appointments", isAdmin(), ac.getAppointments)
router.get("/get-appointment-per-business", isAdmin(), ac.getAppointmentbyBuisness)
router.get("/get-orders", isAdmin(), getOrders)

module.exports = router
