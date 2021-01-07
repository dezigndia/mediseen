const expressAsyncHandler = require("express-async-handler")
const statusCodes = require("http-status-codes")
const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const AuthService = require('../services/auth/auth.service');
const authService = new AuthService();
class TwilioController {
	async login(req, res) {
		try {
			const data = await authService.login(req.body);
			if(data) {
				return res
				.status(statusCodes.OK)
				.send({ status: true, data: data, message: 'login done successfully' })
			} else {
				return res.status(statusCodes.OK)
				.send({ status: false, data: data, message: 'failed' })
			}
		} catch (error) {
			return res.status(statusCodes.BAD_REQUEST).send({status: false, error: error})
		}
	}

	verify = expressAsyncHandler(async (req, res) => {
		const { code, phoneNumber, name } = req.body
		const data = await client.verify
			.services(process.env.TWILIO_SERVICE)
			.verificationChecks.create({
				to: `+91${phoneNumber}`,
				code,
			})

		if (data.status === "approved") {
			const user = await User.create({ name, phone: phoneNumber })

			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "1d",
			})

			const payload = {
				token,
				status: data.status,
			}

			res.status(statusCodes.OK).send({ status: "success", payload })
		} else {
			res
				.status(statusCodes.BAD_REQUEST)
				.send({ status: "fail", payload: data })
		}
	})
}

module.exports = TwilioController
