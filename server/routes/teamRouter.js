const Router = require('express');
const router = new Router();
const teamController = require('../controllers/teamController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/', authMiddleware, teamController.create);
router.get('/', authMiddleware, teamController.getAll);
router.get('/:id', authMiddleware, teamController.getOne);

module.exports = router;