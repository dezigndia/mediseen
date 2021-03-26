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
            if (admin && admin.isSuperAdmin && admin.active) next()
            else
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: unauthorizedAccess,
                })
        } catch (e) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        }
        // return res.status(StatusCodes.UNAUTHORIZED).json({ message: "done" })
    }
}

function isAdmin(access) {
    return async (req, res, next) => {
        try {
            const admin = await getAdminFromToken(req, res)
            console.log(access)
            if (
                admin &&
                admin.active &&
                (admin.isSuperAdmin || admin.departments.indexOf(access) >= 0 || !access)
            )
                next()
            else
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: unauthorizedAccess,
                })
        } catch (e) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        }
        // return res.status(StatusCodes.UNAUTHORIZED).json({ message: "done" })
    }
}

module.exports = { isSuperAdmin, isAdmin }
