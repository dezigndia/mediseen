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
    getWeeklyAppointmentTrend,
    removeProduct,
    getNewBusinessCount,
    patientCount,
    totalOAMonth,
    totalRelativeAmount,
    getOrderTrend,
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
router.post("/remove-product", isAdmin(), removeProduct)

router.get("/get-monthly-orders", isAdmin(), getOrderTrend)
router.post("/get-weekly-appointment-trend", isAdmin(), getWeeklyAppointmentTrend)

// router.get("/active-business-month", isAdmin(), ) can't be done right now!
router.get("/new-business-this-month", isAdmin(), getNewBusinessCount)
router.get("/get-total-patients", isAdmin(), patientCount) // not tested properly as server is down right now!
router.get("/get-total-oa-month", isAdmin(), totalOAMonth)
router.get("/get-relative-amounts", totalRelativeAmount)
module.exports = router
