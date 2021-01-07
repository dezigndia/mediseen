const router = require("express").Router()

const authRouter = require("./auth.route")
const userRouter = require("./user.route")
const testRouter = require("./exampleRoute")
const doctorRouter = require("./doctor.route")

router.use("/test", testRouter)
router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/doctor", doctorRouter)

module.exports = router
