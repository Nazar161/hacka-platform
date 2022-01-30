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

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const vacancy = await vacancyService.getOneVacancy(id);
            return res.json(vacancy);
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query;
        const {id} = req.user;
        page = page || 1;
        limit = limit || 10
        let offset = page * limit - limit;
        const vacancies = await vacancyService.getAllVacancies(limit, offset, id);
        return res.json(vacancies);
    }

    async getFilteredVacancies(req, res) {
        let {limit, page, skills} = req.query;
        const {id} = req.user;
        page = page || 1;
        limit = limit || 10
        let offset = page * limit - limit;
        const filteredVacancies = await vacancyService.getFilteredVacancies(limit, offset, id, skills);
        return res.json(filteredVacancies)
    }

    async delete(req, res, next) {

    }
}

module.exports = new VacancyController()