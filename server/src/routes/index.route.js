const router = require('express').Router();

const authRouter = require('./twilioRoute');
const testRouter = require('./exampleRoute');

router.use('/test', testRouter);
router.use('/auth', authRouter);

module.exports = router;