const Router = require('express');
const router = new Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware.js');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js')

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

// ADMIN
router.get('/captains', checkRoleMiddleware(2), userController.getCaptains);

router.get('/:id', authMiddleware, userController.getOne);

router.post('/', userController.create);


module.exports = router;