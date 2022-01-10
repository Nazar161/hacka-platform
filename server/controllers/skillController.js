const {Skill} = require("../models/models");

class SkillController {

    async getSkills(req, res, next) {
        const skills = await Skill.findAll({attributes: ['id', 'name']});
        return res.json(skills)
    }
}

module.exports = new SkillController()