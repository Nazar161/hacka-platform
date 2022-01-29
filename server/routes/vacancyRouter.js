const Router = require('express');
const router = new Router();
const vacancyController = require('../controllers/vacancyController.js');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/', checkRoleMiddleware(3), vacancyController.create);


module.exports = router;