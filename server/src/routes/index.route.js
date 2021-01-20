const router = require("express").Router()

const authRouter = require("./auth.route")
const testRouter = require("./exampleRoute")
const hospitalRouter = require("./hospital.route")
const pathologyRouter = require("./pathology.route")
const userRouter = require("./user.route")
const doctorRouter = require("./doctor.route")
const pharmacyRouter = require("./pharmacy.route")
const businessRouter = require("./business.route")
const productRouter = require("./product.route")


router.use("/test", testRouter)
router.use("/auth", authRouter)
router.use("/hospital", hospitalRouter)
router.use("/pathology", pathologyRouter)
router.use("/user", userRouter)
router.use("/doctor", doctorRouter)
router.use("/pharmacy", pharmacyRouter)
router.use("/business", businessRouter)
router.use("/product", productRouter)


module.exports = router
