const {Vacancy, Team, Skill, VacancyApplications, Status} = require("../models/models");
const ApiError = require("../exceptions/apiError");
const {Op} = require("sequelize");

class VacancyService {

    async createVacancy(title, description, team_id, skills) {
        const vacancy = await Vacancy.create({title, description, team_id});
        const setVacancySkills = await Vacancy.findOne({where: {id: vacancy.id}});
        setVacancySkills.setSkills(skills);
        return vacancy;
    }

    async getOneVacancy(id) {
        let vacancy = await Vacancy.findOne({
            where: {id},
            attributes: ['id', 'title', 'description', 'updatedAt'],
            include: [
                {model: Team, attributes: ['id', 'name']},
            ]
        })
        if(!vacancy) {
            throw ApiError.BadRequest(`такой вакансии не существует`)
        }

        const vacancySkills = await Vacancy.findOne({
            where: {id},
            attributes: [],
            include: [{model: Skill, attributes: ['name'], through: {attributes: []}}]
        })

        const skills = vacancySkills.skills.map(item => item.name);
        return {vacancy, skills}
    }

    async getAllVacancies(limit, offset, id) {
        const vacancies = await Vacancy.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'title'],
            include: [
                {model: VacancyApplications, where: {user_id: id}, attributes: ['status_id'], required: false}
            ]
        });
        return vacancies;
    }

    async getFilteredVacancies(limit, offset, id, skills) {
        const filteredVacancies = await Vacancy.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'title'],
            include: [
                {model: VacancyApplications, where: {user_id: id}, attributes: ['status_id'], required: false},
                {model: Skill, where: {name: {[Op.or]: [skills]}}, attributes: ['name'], through: {attributes: []}}
            ],
        })

        return  filteredVacancies;
    }

}

module.exports = new VacancyService()