const router = require('express').Router();

const authRouter = require('./auth.route');
const testRouter = require('./exampleRoute');
const hospitalRouter = require('./hospital.route');


router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/hospital',hospitalRouter);

module.exports = router;