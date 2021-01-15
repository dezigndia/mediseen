const router = require("express").Router()

const UserController = require("../controllers/userController")
const { authenticate } = require("../utils/authenticate")
const uc = new UserController()

router.get("/", uc.getAllUsers)
router.get("/:userId", uc.getUserByID)
router.put("/", uc.updateUser)
router.delete("/", uc.deleteUser)
router.get("/get/info", authenticate(), uc.getUser) //TODO need to add validation

module.exports = router
