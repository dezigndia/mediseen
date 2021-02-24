const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")
const Doctor = require("../models/DoctorModel")
const Hospital = require("../models/HospitalModel")
const Pathology = require("../models/PathologyModel")
const Pharmarcy = require("../models/PharmacyModel")
const User = require("../models/UserModel")

function authenticate() {
    return async (req, res, next) => {
        const header = req.headers["authorization"]
        if (!header) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }
        const token = header.split(" ")[1]
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }

        try {
            const user = await jwt.verify(
                token,
                config.has("jwt.secret") ? config.get("jwt.secret") : null
            )
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    error: "Unauthorized Access",
                })
            }
            const category = user.type
            const phoneNumber = user.phone
            let final_user
            switch (category) {
                case "user": {
                    final_user = await User.findOne({ phone: phoneNumber })
                    break
                }
                case "doctor": {
                    final_user = await Doctor.findOne({ phone: phoneNumber, type: category })
                    break
                }
                case "pharmacy": {
                    final_user = await Pharmarcy.findOne({ phone: phoneNumber, type: category })
                    break
                }
                case "hospital": {
                    final_user = await Hospital.findOne({ phone: phoneNumber, type: category })
                    break
                }
                case "pathology": {
                    final_user = await Pathology.findOne({ phone: phoneNumber, type: category })
                    break
                }
                default: {
                    throw Error("Category must be one of doctor, pharmacy, hospital, pathology")
                }
            }
            if (!final_user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    error: "Unauthorized Access",
                })
            }
            res.locals.user = final_user
            next()
        } catch (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: "Server Error",
                err: err.message,
            })
        }
    }
}

module.exports = { authenticate }
