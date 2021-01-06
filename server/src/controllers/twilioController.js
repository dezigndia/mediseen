const expressAsyncHandler = require("express-async-handler")
const statusCodes = require("http-status-codes")
const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const client = require("twilio")(process.env.TWILIO_ID, process.env.TWILIO_AUTH)

class TwilioController {
	login = expressAsyncHandler(async (req, res) => {
		const { phoneNumber } = req.body
		const data = await client.verify
			.services(process.env.TWILIO_SERVICE)
			.verifications.create({
				to: `+91${phoneNumber}`,
				channel: "sms",
			})

		if (data.status === "pending") {
			res
				.status(statusCodes.OK)
				.send({ status: "success", payload: data.status })
		} else {
			res
				.status(statusCodes.BAD_REQUEST)
				.send({ status: "fail", payload: data })
		}
	})

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
