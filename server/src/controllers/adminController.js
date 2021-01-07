const expressAsyncHandler = require("express-async-handler")
const Admin = require("../models/AdminModel")
const jwt = require("jsonwebtoken")

class AdminController {
	login = expressAsyncHandler(async (req, res) => {
		const { email } = req.body

		Admin.findOne({ email }).then((admin) => {
			if (admin) {
				if (admin.password != req.body.password) {
					res.status(404).json({
						message: "Auth failed",
					})
				}
				var token = jwt.sign(
					{
						email: admin[0].email,
						password: admin[0].password,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: "60",
					}
				)
				res.status(200).json({
					message: "User Found",
					token: token,
				})
			} else {
				res.status(404).json({
					message: "Auth Failed",
				})
			}
		})
	})
}

module.exports = AdminController
