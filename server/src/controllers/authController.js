const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AuthService = require("../services/auth/auth.service")
const AppError = require("../utils/errorHandler")

const authService = new AuthService()

class AuthController {
    verifyOtp = expressAsyncHandler(async (req, res) => {
        const { phoneNumber, otp } = req.body
        const data = await authService.verifyOtp(phoneNumber, otp)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    sendOTP = expressAsyncHandler(async (req, res) => {
        const data = await authService.sendOTP(req.body)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
}

module.exports = AuthController
