const Router = require('express');
const router = new Router();
const caseController = require('../controllers/caseController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// ADMIN creates cases
router.post('/', checkRoleMiddleware(2), caseController.create);
router.post('/subject', checkRoleMiddleware(2), caseController.createSubject);
// Case selection CAPTAIN
router.post('/teamCaseSelection', checkRoleMiddleware(3), caseController.selectCase);

router.get('/eventCases', authMiddleware, caseController.getEventCases);
router.get('/:id', authMiddleware, caseController.getOne);

module.exports = router;