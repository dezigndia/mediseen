const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const Admin = require("../models/AdminModel")
const jwt = require("jsonwebtoken")
const AdminService = require("../services/admin/admin.service")
const adminService = new AdminService()

class AdminController {
	register = expressAsyncHandler(async (req, res) => {
		const data = await adminService.register(req.body)

		if (data) {
			
			return res
				.status(StatusCodes.CREATED)
				.json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
		}
    })
    
    login = expressAsyncHandler(async (req, res) => {
            // const email = req.body.email

		    const admin = await Admin.findOne({ email:req.body.email });
			if (admin) {
				if (admin.password != req.body.password) {
					res.status(404).json({
						message: "Password not matched",
					})
                }
				var token = jwt.sign(
					{
						email: admin[0].email,
						id:admin[0]._id
					},
					process.env.JWT_SECRET,
					{
						expiresIn: "1h",
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
}

module.exports = AdminController