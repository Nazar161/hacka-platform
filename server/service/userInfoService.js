const {UserInfo} = require("../models/models");

class UserInfoService {
    async update(id, organization, portfolio, number_of_hackathons, role_in_team, skills) {

        const updateUserInfo = await UserInfo.findOne({where: {user_id: id}});
        updateUserInfo.set({
            organization,
            portfolio,
            number_of_hackathons,
            role_in_team,
        })
        await updateUserInfo.save();
        const updateSkills = await updateUserInfo.setSkills(skills);

        return updateUserInfo;
    }
}

module.exports = new UserInfoService();