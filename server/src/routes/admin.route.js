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
    getTests,
    getMonthlyOrderTrend,
    getWeeklyAppointmentTrend,
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
router.get("/get-tests", isAdmin(), getTests)
router.get("/get-users", isAdmin(), getUsers)
router.get("/get-businesses", isAdmin(), getBusinessList)
router.get("/get-total-users", isAdmin(), getTotalUsers)
router.get("/get-total-businesses", isAdmin(), getTotalBusinesses)
router.get("/get-appointments", isAdmin(), ac.getAppointments)
router.get("/get-appointment-per-business", isAdmin(), ac.getAppointmentbybusiness)
router.get("/get-orders", isAdmin(), getOrders)

router.get("/get-monthly-orders", isAdmin(), getMonthlyOrderTrend)
router.get("/get-weekly-appointment-trend", getWeeklyAppointmentTrend)

module.exports = router
