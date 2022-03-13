const {Team, User, Vacancy, Case, CaseWinners, HackathonEventTeams} = require("../models/models");
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

    async takePart(team_id, eventId) {
        const teamTakesPart = await HackathonEventTeams.create({
            team_id,
            hackathon_event_id: eventId
        })

        return teamTakesPart;
    }

    async cancelTakingPart(team_id, eventId) {
        await HackathonEventTeams.destroy({
            where: {
                team_id,
                hackathon_event_id: eventId
            }
        });
    }

    async confirm(team_id, eventId) {
        const confirmation = await HackathonEventTeams.findOne({
            where: {
                team_id,
                hackathon_event_id: eventId
            }
        })
        confirmation.team_confirmation = true;

        await confirmation.save();
    }

    
}

module.exports = new TeamService();