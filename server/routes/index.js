const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const userInfoRouter = require('./userInfoRouter');
const skillRouter = require('./skillRouter');
const teamRouter = require('./teamRouter');
const caseRouter = require('./caseRouter');
const vacancyRouter = require('./vacancyRouter');
const eventRouter = require('./eventRouter');


router.use('/user', userRouter);
router.use('/userInfo', userInfoRouter);
router.use('/skill', skillRouter);
router.use('/team', teamRouter);
router.use('/case', caseRouter);
router.use('/vacancy', vacancyRouter);
router.use('/event', eventRouter);

module.exports = router;
