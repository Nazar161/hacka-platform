const caseService = require('../service/caseService.js')

class CaseController {
    async selectCase(req, res, next) {
        try {
            const {case_id} = req.body;
            const {team_id} = req.user;
            const selectedCase = await caseService.selectCase(team_id, case_id);
            return res.json(selectedCase);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CaseController()