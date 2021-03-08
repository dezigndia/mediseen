const express = require("express")
const {
    addAdmin,
    removeAdmin,
    getAdmins,
    getProducts,
    getUsers,
    getTotalUsers,
    getTotalBusinesses,
} = require("../controllers/adminController")
const { isSuperAdmin } = require("../utils/adminHelper")
const BusinessController = require("../controllers/businessController")

const bc = new BusinessController()
const router = express.Router()

router.post("/add-admin", isSuperAdmin(), addAdmin)
router.post("/remove-admin", isSuperAdmin(), removeAdmin)
router.get("/get-admins", isSuperAdmin(), getAdmins)
router.get("/get-products", getProducts)
router.get("/get-users", getUsers)
router.get("/get-businesses", bc.getBusinessList)
router.get("/get-total-users", getTotalUsers)
router.get("/get-total-businesses", getTotalBusinesses)

module.exports = router
