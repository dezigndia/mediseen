const expressAsyncHandler = require("express-async-handler")
const Admin = require("../models/AdminModel")
const jwt = require("jsonwebtoken")

class AdminController {
	login = expressAsyncHandler(async (req, res) => {
		const { email } = req.body

		Admin.find({ email }).then((admin) => {
			console.log(admin)
			if (admin) {
				if (admin.password != req.body.password) {
					res.status(401).json({
						status: false,
						message: "Auth failed",
					})
				}
				var token = jwt.sign(
					{
						email: admin.email,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: "1d",
					}
				)
				res.status(200).json({
					status: true,
					message: "User Found",
					token: token,
				})
			} else {
				res.status(404).json({
					status: false,
					message: "Auth Failed",
				})
			}
		})
	})
}

module.exports = AdminController
