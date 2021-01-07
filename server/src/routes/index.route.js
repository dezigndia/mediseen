const router = require('express').Router();

const authRouter = require('./auth.route');
const testRouter = require('./exampleRoute');

router.use('/test', testRouter);
router.use('/auth', authRouter);

module.exports = router;