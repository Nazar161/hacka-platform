const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController.js');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js')

router.post('/', checkRoleMiddleware(2), eventController.create);
router.post('/partners', eventController.addPartners);
router.post('/organizers', eventController.addOrganizers);
router.get('/searchPartners', eventController.searchPartners);
router.get('/searchOrganizers', eventController.searchOrganizers);




module.exports = router