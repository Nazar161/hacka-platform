const Router = require('express');
const router = new Router();
const skillController = require('../controllers/skillController.js');

router.get('/', skillController.getSkills);


module.exports = router