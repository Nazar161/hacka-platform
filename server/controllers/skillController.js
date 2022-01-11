const {Skill} = require("../models/models");

class SkillController {

    async getSkills(req, res, next) {
        const skills = await Skill.findAll({attributes: ['id', 'name']});
        return res.json(skills)
    }

    async createSkill(req, res, next) {
        const {name} = req.body;
        const skill = await Skill.create({name});
        return res.json(skill);
    }
}

module.exports = new SkillController()