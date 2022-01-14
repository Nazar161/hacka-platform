const {TeamCurrentCase, Team, Case} = require("../models/models");

class CaseService {
    async selectCase(team_id, case_id) {
        // const teamCases = await TeamCases.create({team_id, case_id});
        const team = await Team.findOne({where: {id: team_id}});
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
            return {currentCase};
        }
        currentCase.case_id = case_id;
        await currentCase.save();
        return {currentCase}
    }
}

module.exports = new CaseService();