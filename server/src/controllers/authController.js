const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AuthService = require("../services/auth/auth.service")
const AppError = require("../utils/errorHandler")

const authService = new AuthService()

class AuthController {
    verifyOtp = expressAsyncHandler(async (req, res) => {
        const { mobileNumber, otp } = req.body
        if (!mobileNumber) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Phone Number Missing")
        }
        const data = await authService.verifyOtp(mobileNumber, otp)
        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    sendOTP = expressAsyncHandler(async (req, res) => {
        const { mobileNumber } = req.body
        if (!mobileNumber) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Phone Number Missing")
        }
        const data = await authService.sendOTP(mobileNumber)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
}

module.exports = AuthController
