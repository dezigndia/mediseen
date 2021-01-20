const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")

const UserService = require("../services/users/user.service")
const userService = new UserService()

const AppError = require("../utils/errorHandler")

class UserController {
    getUser = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        return res.status(StatusCodes.OK).json({ status: true, payload: user })
    })

    getAllUsers = expressAsyncHandler(async (req, res) => {
        const { limit, skip, term } = req.query
        const data = await userService.getUser(null, term, limit, skip)

        if (data) {
            res.status(200).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "User List not found.")
        }
    })

    getUserByID = expressAsyncHandler(async (req, res) => {
        const { userId } = req.params

        const data = await userService.getUser("_id", userId)

        if (data) {
            res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "User not found.")
        }
    })

    updateUser = expressAsyncHandler(async (req, res) => {
        const { name, userId } = req.body

        const data = await userService.updateUser(userId, { name })

        if (data) {
            res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "User not found.")
        }
    })

    deleteUser = expressAsyncHandler(async (req, res) => {
        const { userId } = req.body

        const data = await userService.deleteUser(userId)

        if (data) {
            res.status(StatusCodes.OK).json({ status: true, payload: "User Deleted." })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Something went wrong.")
        }
    })
}

module.exports = UserController
