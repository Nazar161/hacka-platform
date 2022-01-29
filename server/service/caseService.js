const {TeamCurrentCase, Team, Case, HackathonEvent, TeamCases} = require("../models/models");

class CaseService {
    async selectCase(team_id, case_id) {
        const team = await Team.findOne({where: {id: team_id}, attributes: ['id']});
        await team.addCase(case_id);

        const currentCase = await TeamCurrentCase.findOne({
            where: {team_id},
            attributes: ['id'],
            include: {model: Case, attributes: ['id', 'title']},
        });
        if(!currentCase) {
            const currentCase = await TeamCurrentCase.create(
                {team_id, case_id},
            );
            const selectedCase = await Case.findOne({
                where: {id: currentCase.case_id},
                attributes: ['id', 'title'],
                include: {model: HackathonEvent, attributes: ['id', 'title']}
            });
            return selectedCase;
        }
        currentCase.case_id = case_id;
        await currentCase.save();
        const selectedCase = await Case.findOne({
            where: {id: currentCase.case_id},
            attributes: ['id', 'title'],
            include: {model: HackathonEvent, attributes: ['id', 'title']}
        });
        return selectedCase;
    }
}

module.exports = new CaseService();