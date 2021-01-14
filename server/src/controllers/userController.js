const expressAsyncHandler = require("express-async-handler")
<<<<<<< HEAD
const { StatusCodes } = require("http-status-codes")
=======
const statusCodes = require("http-status-codes")
>>>>>>> 668acd12b8fa246d89c7cb1875e2dded9b5948e8

const UserService = require("../services/users/user.service")
const userService = new UserService()

const AppError = require("../utils/errorHandler")

class UserController {
	getAllUsers = expressAsyncHandler(async (req, res) => {
<<<<<<< HEAD
		const { limit, skip, term } = req.query

		const data = await userService.getUser(null, term, limit, skip)
=======
		const { limit, skip } = req.query

		const data = await userService.getUser(null, null, limit, skip)
>>>>>>> 668acd12b8fa246d89c7cb1875e2dded9b5948e8

		if (data) {
			res.status(200).json({ status: true, payload: data })
		} else {
<<<<<<< HEAD
			throw new AppError(StatusCodes.NOT_FOUND, "User List not found.")
=======
			throw new AppError(statusCodes.NOT_FOUND, "User List not found.")
>>>>>>> 668acd12b8fa246d89c7cb1875e2dded9b5948e8
		}
	})

	getUserByID = expressAsyncHandler(async (req, res) => {
		const { userId } = req.params

		const data = await userService.getUser("_id", userId)

		if (data) {
			res.status(statusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "User not found.")
		}
	})

	updateUser = expressAsyncHandler(async (req, res) => {
		const { name, userId } = req.body

		const data = await userService.updateUser(userId, { name })

		if (data) {
			res.status(statusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "User not found.")
		}
	})

	deleteUser = expressAsyncHandler(async (req, res) => {
		const { userId } = req.body

		const data = await userService.deleteUser(userId)

		if (data) {
			res
				.status(statusCodes.OK)
				.json({ status: true, payload: "User Deleted." })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Something went wrong.")
		}
	})
}

module.exports = UserController
