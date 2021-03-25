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
    updateBusinessStatus,
} = require("../controllers/adminController")
const { isSuperAdmin, isAdmin } = require("../utils/adminHelper")
const BusinessController = require("../controllers/businessController")
const AppointmentController = require("../controllers/appointmentController")
const { adminDepartments } = require("../utils/constants")

const bc = new BusinessController()
const ac = new AppointmentController()
const router = express.Router()

router.post("/add-admin", isSuperAdmin(), addAdmin)
router.post("/remove-admin", isSuperAdmin(), removeAdmin)
router.get("/get-admins", isSuperAdmin(), getAdmins)
router.get("/get-products", isAdmin(adminDepartments.list), getProducts)
router.get("/get-tests", isAdmin(adminDepartments.list), getTests)
router.get("/get-users", isAdmin(), getUsers)
router.get("/get-businesses", isAdmin(adminDepartments.search), getBusinessList)
router.get("/get-total-users", isAdmin(adminDepartments.search), getTotalUsers)
router.get("/get-total-businesses", isAdmin(adminDepartments.search), getTotalBusinesses)
router.get("/get-appointment-per-business", isAdmin(), ac.getAppointmentbybusiness)
router.get("/get-orders", isAdmin(adminDepartments.orders), getOrders)
router.post("/remove-product", isAdmin(adminDepartments.list), removeProduct)

router.get("/get-monthly-orders", isAdmin(adminDepartments.search), getOrderTrend)
router.post(
    "/get-weekly-appointment-trend",
    isAdmin(adminDepartments.search),
    getWeeklyAppointmentTrend
)

// router.get("/active-business-month", isAdmin(), ) can't be done right now!
router.get("/new-business-this-month", isAdmin(adminDepartments.search), getNewBusinessCount)
router.get("/get-total-patients", isAdmin(adminDepartments.search), patientCount) // not tested properly as server is down right now!
router.get("/get-total-oa-month", isAdmin(adminDepartments.search), totalOAMonth)
router.get("/get-relative-amounts", isAdmin(adminDepartments.search), totalRelativeAmount)
router.put("/update-business-status", isAdmin(adminDepartments.search), updateBusinessStatus)
module.exports = router
