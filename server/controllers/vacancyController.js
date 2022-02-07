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

    async delete(req, res) {
        const {id} = req.params;
        const deletedVacancy = await vacancyService.deleteVacancy(id);
        return res.json(deletedVacancy)
    }

    async apply(req, res, next) {
        try {
            const {message, vacancy_id} = req.body;
            const {id, team_id} = req.user;
            const vacancyApplication = await vacancyService.apply(message, vacancy_id, id, team_id);
            return res.json(vacancyApplication);
        } catch (e) {
            next(e)
        }
    }

    async getTeamVacancies(req, res) {
            const {team_id} = req.user;
            const teamVacancies = await vacancyService.getTeamVacancies(team_id);
            return res.json(teamVacancies);
    }

    async getVacancyApplications(req, res) {
            const {vacancy_id} = req.params;
            const vacancyApplications = await vacancyService.getVacancyApplications(vacancy_id);
            return res.json(vacancyApplications)
    }

    async giveTeamResponse(req, res, next) {
        try {
            const {teamRes, vacancyApplicationId, user_id} = req.body;
            const {team_id} = req.user;
            const teamResponse = await vacancyService.giveTeamResponse(teamRes, vacancyApplicationId, user_id, team_id);
            return res.json(teamResponse)
        } catch (e) {
            next(e)
        }
    }

    async getUserApplications(req, res, next) {
        const {id} = req.user;
        const userApplications = await vacancyService.getUserApplications(id);
        return res.json(userApplications);
    }
}

module.exports = new VacancyController()