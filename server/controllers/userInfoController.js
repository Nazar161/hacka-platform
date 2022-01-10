const UserInfoService = require('../service/userInfoService.js')
class UserInfoController {
    async create(req, res, next) {

    }

    async update(req, res, next) {
        try {
            const {organization, portfolio, number_of_hackathons, role_in_team, skills} = req.body;
            const {id} = req.user
            const updateInfo = await UserInfoService.update(id, organization, portfolio, number_of_hackathons, role_in_team, skills);
            return res.json(updateInfo)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserInfoController();