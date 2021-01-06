const router = require("express").Router()
const Joi = require('@hapi/joi');
const AdminValidator = require("../middlewares/validators")
const UserController = require("../controllers/userController");
const uc = new UserController();

router.post("/login", AdminValidator.validateUser,  uc.login);


module.exports = router
