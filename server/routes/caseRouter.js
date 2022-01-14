const Router = require('express');
const router = new Router();
const caseController = require('../controllers/caseController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js')


// Case selection CAPTAIN
router.post('/teamCaseSelection', checkRoleMiddleware(3), caseController.selectCase);

module.exports = router;