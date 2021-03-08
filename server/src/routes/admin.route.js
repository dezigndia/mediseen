const express = require("express")
const { addAdmin, removeAdmin, getAdmins } = require("../controllers/adminController")
const { isSuperAdmin } = require("../utils/adminHelper")
const router = express.Router()

router.post("/add-admin", isSuperAdmin(), addAdmin)
router.post("/remove-admin", isSuperAdmin(), removeAdmin)
router.post("/get-admins", isSuperAdmin(), getAdmins)
module.exports = router
