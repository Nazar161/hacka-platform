const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const userInfoRouter = require('./userInfoRouter');

router.use('/user', userRouter);
router.use('/userInfo', userInfoRouter);

module.exports = router;
