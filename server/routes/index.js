const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const userInfoRouter = require('./userInfoRouter');
const skillRouter = require('./skillRouter');

router.use('/user', userRouter);
router.use('/userInfo', userInfoRouter);
router.use('/skill', skillRouter);

module.exports = router;
