const Router = require('express');
const router = new Router();
const userInfoController = require('../controllers/userInfoController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

//adding info about User
router.post('/', userInfoController.create);
router.put('/', authMiddleware, userInfoController.update);

module.exports = router;

