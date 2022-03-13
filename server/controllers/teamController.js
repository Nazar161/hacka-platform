const teamService = require('../service/teamService.js');
const ApiError = require("../exceptions/apiError.js");

class TeamController {
    async create(req, res, next) {
        try{
            const {id, team_id} = req.user;
            if (team_id) {
                throw ApiError.BadRequest('Вы уже состоите в команде')
            }
            const {name, achievements} = req.body;
            console.log(req.user)
            const {refreshToken} = req.cookies;
            const teamData = await teamService.create(id, name, achievements, refreshToken);
            res.cookie('refreshToken', teamData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(teamData);
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res) {
        const teams = await teamService.getAllTeams();
        return res.json(teams)
    }

    async getOne(req, res) {
        const {id} = req.params;
        const team = await teamService.getOneTeam(id);
        return res.json(team);
    }

    async takePart(req, res) {
        const {team_id} = req.user;
        const {eventId} = req.body;
        const teamTakesPart = await teamService.takePart(team_id, eventId);
        return res.json(teamTakesPart)
    }

    async cancelTakingPart(req, res) {
        const {team_id} = req.user;
        const {eventId} = req.body;
        const cancel = await teamService.cancelTakingPart(team_id, eventId)
        return res.json(cancel);
    }

    async confirm(req, res) {
        const {team_id} = req.user;
        const {eventId} = req.body;
        const confirmation = await teamService.confirm(team_id, eventId);
        res.json(confirmation);
    }
}

module.exports = new TeamController();