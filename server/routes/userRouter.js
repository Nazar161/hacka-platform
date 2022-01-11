const Router = require('express');
const router = new Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

//getting users
router.get('/', authMiddleware, userController.getAll);
router.get('/:id', authMiddleware, userController.getOne);

//creating a user, for ADMIN
router.post('/', userController.create);


module.exports = router;