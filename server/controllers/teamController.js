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
}

module.exports = new TeamController();