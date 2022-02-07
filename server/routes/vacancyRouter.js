const Router = require('express');
const router = new Router();
const vacancyController = require('../controllers/vacancyController.js');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/', checkRoleMiddleware(3), vacancyController.create);
router.get('/', authMiddleware, vacancyController.getAll);
router.get('/filteredVacancies', authMiddleware, vacancyController.getFilteredVacancies);
router.get('/teamVacancies', checkRoleMiddleware(3), vacancyController.getTeamVacancies);

router.post('/apply', authMiddleware, vacancyController.apply)

router.post('/teamResponse', checkRoleMiddleware(3), vacancyController.giveTeamResponse)

router.get('/userApplications', authMiddleware, vacancyController.getUserApplications)
router.get('/vacancyApplications/:vacancy_id', vacancyController.getVacancyApplications)
router.get('/:id', vacancyController.getOne);
router.delete('/:id', checkRoleMiddleware(3), vacancyController.delete)

module.exports = router;