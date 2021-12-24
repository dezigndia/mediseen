const User = require("../../models/UserModel")
const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../../utils/errorHandler")
const jwt = require("jsonwebtoken")
const { default: axios } = require("axios")
const config = require("config")

class UserService {
    verifyOtp = expressAsyncHandler(async (name, phoneNumber, otp) => {
        const authKey = config.has("msg91.authkey") ? config.get("msg91.authkey") : null
        const { data } = await axios(
            `https://api.msg91.com/api/v5/otp/verify?mobile=${phoneNumber}&otp=${otp}&authkey=${authKey}`,
            {
                method: "POST",
            }
        )
        if (data.type == "error") throw new AppError(StatusCodes.NOT_ACCEPTABLE, data.message)
        const user = await User.findOne({ phone: phoneNumber })

        if (user) {
            const token = await jwt.sign(
                user.toObject(),
                config.has("jwt.secret") ? config.get("jwt.secret") : null
            )
            return { auth_token: token, isRegistered: user ? true : false }
        } else {
            
            const user = await User.create({ phone: phoneNumber, name: name });
            console.log(user);
            const token = await jwt.sign(
                user.toObject(),
                config.has("jwt.secret") ? config.get("jwt.secret") : null
            )
            return { auth_token: token, isRegistered: user ? true : false }
        }
    })
    sendOTP = expressAsyncHandler(async mobileNumber => {
        const user = await User.findOne({ phone: mobileNumber })
        const authKey = config.has("msg91.authkey") ? config.get("msg91.authkey") : null
        const templateid = config.has("msg91.templateid") ? config.get("msg91.templateid") : null
        const { data } = await axios(
            `https://api.msg91.com/api/v5/otp?authkey=${authKey}&template_id=${templateid}&mobile=${mobileNumber}`,
            {
                method: "GET",
            }
        )
        return { data: data, isRegistered: user ? true : false }
    })

    generalVerifyOtp = expressAsyncHandler(async (phoneNumber, otp) => {
        const authKey = config.has("msg91.authkey") ? config.get("msg91.authkey") : null
        const { data } = await axios(
            `https://api.msg91.com/api/v5/otp/verify?mobile=${phoneNumber}&otp=${otp}&authkey=${authKey}`,
            {
                method: "POST",
            }
        )
        if (data.type == "error") throw new AppError(StatusCodes.NOT_ACCEPTABLE, data.message)
        else return { data: data }
    })
    generalSendOTP = expressAsyncHandler(async mobileNumber => {
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

    getUserDetails = expressAsyncHandler(async phoneNumber => {
        return await User.findOne({ phone: phoneNumber })
    })

    //old
    createUser = expressAsyncHandler(async user => {
        const existing = await this.getUser("phone", user.phone)

        if (!existing) {
            return User.create(user)
        } else {
            return existing
        }
    })

    getUser = expressAsyncHandler(async (type, value, limit, skip) => {
        if (!type && !value) {
            const users = await User.find().limit(parseInt(limit)).skip(parseInt(skip))
            return users
        } else if (type && value) {
            let payload = {}
            payload[`${type}`] = value
            return await User.findOne(payload)
        } else if (!type && value) {
            return await User.find({
                name: { $regex: value, $options: "i" },
            })
        }
    })

    updateUser = expressAsyncHandler(async (phone, payload) => {
        let newUser = {}
        for (const [key, value] of Object.entries(payload)) {
            newUser[`${key}`] = value
        }
        return await User.findOneAndUpdate({ phone: phone }, newUser, { new: true })
    })

    async deleteUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await User.findByIdAndDelete(id)
                if (data) {
                    resolve(true)
                }
            } catch (error) {
                return reject(error)
            }
        })
    }
}

module.exports = UserService
