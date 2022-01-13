const {Team, User} = require("../models/models");
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
}

module.exports = new TeamService();