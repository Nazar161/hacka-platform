const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js')

router.post('/', checkRoleMiddleware(2), eventController.create);
router.get('/', authMiddleware, eventController.getAll);
router.get('/teams', authMiddleware, eventController.eventTeams);
router.get('/teamSelectedCaseId', authMiddleware, eventController.teamSelectedCaseId);
router.post('/partners', eventController.addPartners);
router.post('/organizers', eventController.addOrganizers);
router.get('/searchPartners', eventController.searchPartners);
router.get('/searchOrganizers', eventController.searchOrganizers);

router.get('/:id', authMiddleware, eventController.getOne);




module.exports = router