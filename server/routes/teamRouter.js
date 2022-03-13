const Router = require('express');
const router = new Router();
const teamController = require('../controllers/teamController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js');

router.post('/', authMiddleware, teamController.create);
router.get('/', authMiddleware, teamController.getAll);
router.post('/takepart', checkRoleMiddleware(3), teamController.takePart);
router.post('/takepart/cancel', checkRoleMiddleware(3), teamController.cancelTakingPart);
router.post('/confirm', checkRoleMiddleware(3), teamController.confirm);
router.get('/:id', authMiddleware, teamController.getOne);

module.exports = router;