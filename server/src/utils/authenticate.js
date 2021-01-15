const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")

function authenticate() {
    return async (req, res, next) => {
        const header = req.headers["authorization"]
        console.log("Header", header)

        if (!header) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }
        const token = header.split(" ")[1]
        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }

        try {
            const user = await jwt.verify(token, process.env.JWT_SECRET)
            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    error: "Unauthorized Access",
                })
            }
            res.locals.user = user
            next()
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: "Server Error",
            })
        }
    }
}

module.exports = { authenticate }
