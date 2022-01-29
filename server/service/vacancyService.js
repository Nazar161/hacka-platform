const {Vacancy} = require("../models/models");

class VacancyService {
    async createVacancy(title, description, team_id, skills) {
        const vacancy = await Vacancy.create({title, description, team_id});
        const setVacancySkills = await Vacancy.findOne({where: {id: vacancy.id}});
        setVacancySkills.setSkills(skills);
        return vacancy;
    }
}

module.exports = new VacancyService()