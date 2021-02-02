const mongoose = require("mongoose")
module.exports = (err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        err.statusCode = 400
    }
    err.statusCode = err.statusCode || 500

    const stack = process.env.MODE === "DEVELOPMENT" ? err.stack : null

    return res.status(err.statusCode).json({ status: "fail", payload: err.message, stack })
}
