const {Vacancy, Team, Skill, VacancyApplications, Status, User} = require("../models/models");
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

    async apply(message, vacancy_id, id, team_id) {
        if (team_id) {
            throw ApiError.BadRequest(`Вы уже состоите в команде`)
        }
        const vacancyApplication = await VacancyApplications.create({message, vacancy_id, user_id: id})
        return vacancyApplication;
    }

    async getTeamVacancies(team_id) {
        return await Vacancy.findAll({where: {team_id}, attributes: ['id', 'title']})
    }

    async getVacancyApplications(vacancy_id) {
        return await VacancyApplications.findAll({
            where: {[Op.and]: [{vacancy_id}, {status_id: 1}]},
            attributes: ['id','message'],
            include: {model: User, attributes: ['id','name']}
        })
    }

    async giveTeamResponse(teamRes, vacancyApplicationId, user_id, team_id) {
        if (teamRes === false) {
            const vacancyApplication = await VacancyApplications.findOne({where: {id: vacancyApplicationId}});
            vacancyApplication.status_id = 3;
            await vacancyApplication.save();
            return vacancyApplication;
        }

        const candidate = await User.findOne({where: {id: user_id}});
        if (candidate.team_id) {
            throw ApiError.BadRequest(`Участник уже состоит в команде`);
        }
        candidate.team_id = team_id;
        await candidate.save();

        const vacancyApplication = await VacancyApplications.findOne({where: {id: vacancyApplicationId}});
        vacancyApplication.status_id = 2;
        await vacancyApplication.save();

        return vacancyApplication;

    }
}

module.exports = new VacancyService()