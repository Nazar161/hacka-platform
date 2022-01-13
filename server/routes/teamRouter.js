const Router = require('express');
const router = new Router();
const teamController = require('../controllers/teamController.js');
const authMiddleware = require('../middlewares/authMiddleware.js')

// need to add interceptor on the fronted to refresh tokens and userData

router.post('/', authMiddleware, teamController.create);

module.exports = router;