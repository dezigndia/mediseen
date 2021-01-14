const router = require('express').Router();

const authRouter = require('./auth.route');
const testRouter = require('./exampleRoute');
const hospitalRouter = require('./hospital.route');
const pathologyRouter = require('./pathology.route');
const userRouter = require("./user.route")
const doctorRouter = require("./doctor.route")

router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/hospital',hospitalRouter);
router.use('/pathology',pathologyRouter);
router.use("/user", userRouter)
router.use("/doctor", doctorRouter)

module.exports = router;
