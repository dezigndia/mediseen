const router = require("express").Router();

const AdminValidator = require("../validators");

const AdminController = require("../controllers/adminController");
const ac = new AdminController();

router.post("/admin-login", AdminValidator.validateUser, ac.login);
router.post("/admin-register", ac.register);

module.exports = router;
