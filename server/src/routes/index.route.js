const router = require('express').Router();

const authRouter = require('./auth.route');
const testRouter = require('./exampleRoute');
const hospitalRouter = require('./hospital.route');
const pathologyRouter = require('./pathology.route');


router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/hospital',hospitalRouter);
router.use('/pathology',pathologyRouter);

module.exports = router;