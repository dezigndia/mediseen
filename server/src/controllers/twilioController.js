const expressAsyncHandler = require("express-async-handler")
const statusCodes = require("http-status-codes")
const jwt = require("jsonwebtoken")

const UserService = require("../services/users/user.service")
const userService = new UserService()

const AuthService = require("../services/auth/auth.service")
const authService = new AuthService()
class TwilioController {
	/**
	 * @author sanjay
	 * @description controller method responsible for login
	 * @param {object} req
	 * @param {object} res
	 */
	async login(req, res) {
		try {
			const data = await authService.login(req.body)
			if (data) {
				return res.status(statusCodes.OK).send({
					status: true,
					payload: "OTP has been sent.",
				})
			} else {
				return res
					.status(statusCodes.OK)
					.send({ status: false, data: data, message: "failed" })
			}
		} catch (error) {
			return res
				.status(statusCodes.BAD_REQUEST)
				.send({ status: false, error: error })
		}
	}

	verify = expressAsyncHandler(async (req, res) => {
		const { code, phoneNumber, name } = req.body
		const data = await authService.verify({ phoneNumber, code })

		if (data) {
			const user = await userService.createUser({ name, phone: phoneNumber })

			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "1d",
			})

			const payload = {
				token,
				status: data.status,
			}

			res.status(statusCodes.OK).send({ status: true, payload })
		} else {
			res.status(statusCodes.BAD_REQUEST).send({ status: false, payload: data })
		}
	})
}

module.exports = TwilioController
