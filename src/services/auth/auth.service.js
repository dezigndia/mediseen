const expressAsyncHandler = require("express-async-handler")
const User = require("../../models/UserModel")
const Doctor = require("../../models/DoctorModel")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../../utils/errorHandler")
const jwt = require("jsonwebtoken")
const { default: axios } = require("axios")
const config = require("config")
const Admin = require("../../models/AdminModel")
const Pathology = require("../../models/PathologyModel")
const Pharmacy = require("../../models/PharmacyModel")
const Hospital = require("../../models/HospitalModel")
class AuthService {
    verifyOtp = expressAsyncHandler(async (phoneNumber, otp, businessType, type = null ) => {
        
        const authKey = config.has("msg91.authkey") ? config.get("msg91.authkey") : null
        const { data } = await axios(
            `https://api.msg91.com/api/v5/otp/verify?mobile=${phoneNumber}&otp=${otp}&authkey=${authKey}`,
            {
                method: "POST",
            }
        )
        if (data.type == "error") throw new AppError(StatusCodes.NOT_ACCEPTABLE, data.message)
    
        let user;
        if (businessType === "doctor") {
            user = await Doctor.findOne({ phone: phoneNumber })
            console.log("Doctor")
        }
        else if (businessType === "pharmacy") {
            user = await Pharmacy.findOne({ phone: phoneNumber })
            console.log("Pharmacy")
        }

        else if (businessType === "hospital") {
            user = await Hospital.findOne({ phone: phoneNumber })
        }
        else if (businessType === "Pathology") {
            user = await Pathology.findOne({ phone: phoneNumber })
        }
        else{
        user = type === "admin"
                ? await Admin.findOne({ phoneNumber: phoneNumber })
                : null
        }

        if (user) {
            const token = await jwt.sign(
                user.toObject(),
                config.has("jwt.secret") ? config.get("jwt.secret") : null
            )
            return {
                auth_token: token,
                isRegistered: user ? true : false,
                admin: type === "admin" ? user : undefined,
            }
        } else return { isRegistered: false }
    })
    sendOTP = expressAsyncHandler(async (mobileNumber, businessType) => {
         let user;
        if (businessType === "doctor") {
            user = await Doctor.findOne({ phone: mobileNumber })
            console.log("Doctor")
        }
        else if (businessType === "pharmacy") {
            user = await Pharmacy.findOne({ phone: mobileNumber })
            console.log("Pharmacy")
        }

        else if (businessType === "hospital") {
            user = await Hospital.findOne({ phone: mobileNumber })
        }
        else if (businessType === "Pathology") {
            user = await Pathology.findOne({ phone: mobileNumber })
        }
            
        // console.log(user)
        // const user = await Doctor.findOne({ phone: mobileNumber })
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
    getUser = expressAsyncHandler(async token => {
        return await jwt.verify(token, config.has("jwt.secret") ? config.get("jwt.secret") : null)
    })
}
module.exports = AuthService
