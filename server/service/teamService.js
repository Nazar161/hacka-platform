const {Team, User, Vacancy, Case, CaseWinners} = require("../models/models");
const ApiError = require("../exceptions/apiError.js");
const userService = require('../service/userService.js')

class TeamService {
    async create(id, name, achievements, refreshToken) {

        const checkTeamName = await Team.findOne({where: {name}})
        if (checkTeamName) {
            throw ApiError.BadRequest(`Команда с название ${name} уже существует`);
        }
        const team = await Team.create({name, achievements, format_id: 1},);
        const user = await User.findOne({where: {id}});
        user.team_id = team.id;
        user.role_id = 3;
        await user.save();

        const refreshData = await userService.refresh(refreshToken);

        return {
            ...refreshData,
            team
        }
    }

    async getAllTeams() {
        const teams = await Team.findAll({attributes: ['id', 'name']});
        return teams;
    }

    async getOneTeam(id) {
        const team = await Team.findOne({
            where: {id},
            attributes: ['id', 'name', 'achievements', 'createdAt'],
            include: [
                {model: User, attributes: ['id', 'name']},
                {model: Vacancy, attributes: ['id', 'title']},
                {model: Case, attributes: ['id', 'title'], through: {attributes: []}},
                {model: CaseWinners, attributes: ['case_id', 'rating_id']}
                // on Frontend will solve problem of won cases
            ]
        });
        return team;
    }
}

module.exports = new TeamService();