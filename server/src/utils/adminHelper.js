const { StatusCodes } = require("http-status-codes")
const Admin = require("../models/AdminModel")
const { errorMessage, unauthorizedAccess } = require("./constants")

function isSuperAdmin() {
    return async (req, res, next) => {
        try {
            const email = req.headers.email
            if (!email) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Unauthorized access!",
                })
                return
            }
            // console.log(email)
            const admin = await Admin.findOne({ email: email })

            if (admin && admin.isSuperAdmin) next()
            else
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: unauthorizedAccess,
                })
        } catch (e) {
            console.log(e)
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        }
        // return res.status(StatusCodes.UNAUTHORIZED).json({ message: "done" })
    }
}

module.exports = { isSuperAdmin }
