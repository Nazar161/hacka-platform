const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const userInfoRouter = require('./userInfoRouter');
const skillRouter = require('./skillRouter');
const teamRouter = require('./teamRouter')

router.use('/user', userRouter);
router.use('/userInfo', userInfoRouter);
router.use('/skill', skillRouter);
router.use('/team', teamRouter);


module.exports = router;
