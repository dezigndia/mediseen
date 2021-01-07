const router = require("express").Router()

const UserController = require("../controllers/userController")
const uc = new UserController()

router.get("/", uc.getAllUsers)
router.get("/:userId", uc.getUserByID)
router.put("/", uc.updateUser)
router.delete("/", uc.deleteUser)

module.exports = router
