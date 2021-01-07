const router = require("express").Router()

const authRouter = require("./auth.route")
const userRouter = require("./user.route")
const testRouter = require("./exampleRoute")

router.use("/test", testRouter)
router.use("/auth", authRouter)
router.use("/user", userRouter)

module.exports = router
