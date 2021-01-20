const expressAsyncHandler = require("express-async-handler")
const User = require("../../models/UserModel")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../../utils/errorHandler")
const jwt = require("jsonwebtoken")
const { default: axios } = require("axios")
const config = require("config")
class AuthService {
    verifyOtp = expressAsyncHandler(async (phoneNumber, otp) => {
        // TODO remove hardcoded otp
        const authKey = config.has("msg91.authkey") ? config.get("msg91.authkey") : null
        const { data } = await axios(
            `https://api.msg91.com/api/v5/otp/verify?mobile=${phoneNumber}&otp=${otp}&authkey=${authKey}`,
            {
                method: "POST",
            }
        )
        if (data.type == "error") throw new AppError(StatusCodes.BAD_REQUEST, data.message)
        const user = await User.findOne({ phone: phoneNumber })

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, "No user found with given phone Number")
        }
        const token = await jwt.sign(user.toObject(), process.env.JWT_SECRET)
        return token
    })
    sendOTP = expressAsyncHandler(async mobileNumber => {
        const authKey = config.has("msg91.authkey") ? config.get("msg91.authkey") : null
        const templateid = config.has("msg91.templateid") ? config.get("msg91.templateid") : null
        const { data } = await axios(
            `https://api.msg91.com/api/v5/otp?authkey=${authKey}&template_id=${templateid}&mobile=${mobileNumber}`,
            {
                method: "GET",
            }
        )

        return { data: data }
    })
    getUser = expressAsyncHandler(async token => {
        return await jwt.verify(token, process.env.JWT_SECRET)
    })
}
module.exports = AuthService
