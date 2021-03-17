const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")

const UserService = require("../services/users/user.service")
const userService = new UserService()

const AppError = require("../utils/errorHandler")

class UserController {
    verifyOtp = expressAsyncHandler(async (req, res) => {
        const { phoneNumber, otp } = req.body
        if (!phoneNumber) {
            throw new AppError(StatusCodes.BAD_REQUEST, "phoneNumber Missing")
        }
        const data = await userService.verifyOtp(phoneNumber, otp)
        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    sendOTP = expressAsyncHandler(async (req, res) => {
        const { phoneNumber } = req.body
        if (!phoneNumber) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Phone Number Missing")
        }
        const data = await userService.sendOTP(phoneNumber)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })

    generalVerifyOtp = expressAsyncHandler(async (req, res) => {
        const { phoneNumber, otp } = req.body
        if (!phoneNumber) {
            throw new AppError(StatusCodes.BAD_REQUEST, "phoneNumber Missing")
        }
        const data = await userService.generalVerifyOtp(phoneNumber, otp)
        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    generalSendOTP = expressAsyncHandler(async (req, res) => {
        const { phoneNumber } = req.body
        if (!phoneNumber) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Phone Number Missing")
        }
        const data = await userService.generalSendOTP(phoneNumber)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })


    getUserDetails = expressAsyncHandler(async (req, res) => {
        const { phone } = res.locals.user
        const data = await userService.getUserDetails(phone)
        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error")
        }
    })

    updateUser = expressAsyncHandler(async (req, res) => {
        const { phone } = res.locals.user

        const data = await userService.updateUser(phone, req.body)

        if (data) {
            res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "User not found.")
        }
    })

    getUser = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        return res.status(StatusCodes.OK).json({ status: true, payload: user })
    })
    // old

    getAllUsers = expressAsyncHandler(async (req, res) => {
        const { limit, skip, term } = req.query
        const data = await userService.getUser(null, term, limit, skip)
        if (data) {
            res.status(200).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "User List not found.")
        }
    })

    deleteUser = expressAsyncHandler(async (req, res) => {
        const { userId } = req.body //FIXME userId?
        const data = await userService.deleteUser(userId)

        if (data) {
            res.status(StatusCodes.OK).json({ status: true, payload: "User Deleted." })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Something went wrong.")
        }
    })
}

module.exports = UserController
