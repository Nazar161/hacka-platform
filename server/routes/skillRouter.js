const Router = require('express');
const router = new Router();
const skillController = require('../controllers/skillController.js');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware.js')

router.get('/', skillController.getSkills);
router.post('/', checkRoleMiddleware(2), skillController.createSkill)


module.exports = router