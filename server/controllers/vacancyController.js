const vacancyService = require('../service/vacancyService.js');

class VacancyController {
    async create(req, res, next) {
        try {
            const {title, description, skills} = req.body;
            const {team_id} = req.user;
            const vacancy = await vacancyService.createVacancy(title, description, team_id, skills);
            return res.json(vacancy)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new VacancyController()