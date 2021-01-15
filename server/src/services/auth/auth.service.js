const expressAsyncHandler = require("express-async-handler")
const User = require("../../models/UserModel")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../../utils/errorHandler")
const jwt = require("jsonwebtoken")

class AuthService {
    verifyOtp = expressAsyncHandler(async (phoneNumber, otp) => {
        // TODO remove hardcoded otp
        if (otp == "1000") {
            const user = await User.findOne({ phone: phoneNumber })

            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, "No user found with given phone Number")
            }
            const token = await jwt.sign(user.toObject(), process.env.JWT_SECRET)
            return token
        }
    })
    sendOTP = expressAsyncHandler(async mobileNumber => {
        return { otp: 1000 }
    })
    getUser = expressAsyncHandler(async token => {
        return await jwt.verify(token, process.env.JWT_SECRET)
    })
}
module.exports = AuthService
