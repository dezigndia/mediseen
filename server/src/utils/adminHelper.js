const { StatusCodes } = require("http-status-codes")
const Admin = require("../models/AdminModel")
const { errorMessage, unauthorizedAccess } = require("./constants")
const AuthService = require("../services/auth/auth.service")
const jwt = require("jsonwebtoken")
const { getAdminFromToken } = require("../services/admin/admin.service")
const as = new AuthService()

function isSuperAdmin() {
    return async (req, res, next) => {
        try {
            const admin = await getAdminFromToken(req)

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

function isAdmin() {
    return async (req, res, next) => {
        try {
            console.log("inside is admin")
            const admin = await getAdminFromToken(req)

            if (admin) next()
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

module.exports = { isSuperAdmin, isAdmin }
