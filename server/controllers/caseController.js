const caseService = require('../service/caseService.js')

class CaseController {
    async selectCase(req, res, next) {
        try {
            const {team_id} = req.user;
            const {case_id} = req.body;
            const selectedCase = await caseService.selectCase(team_id, case_id);
            return res.json(selectedCase);
        } catch (e) {
            next(e)
        }
    }

    // FIX
    async create(req, res, next) {
        try {
            const {title, description, details, hackathonEventId, organizerId, subjects} = req.body;
            const _case = await caseService.createCase(title, description, details, hackathonEventId, organizerId, subjects);
            return res.json(_case);   
        } catch (e) {
            next(e)
        }
    }

    async createSubject(req, res, next) {
        try {
            const {title} = req.body;
            const subject = await caseService.createSubject(title);
            return res.json(subject);   
        } catch (e) {
            next(e);
        }
    }

    async getEventCases(req, res, next) {
        try {
            const {eventId} = req.query;
            const cases = await caseService.getEventCases(eventId)
            return res.json(cases);
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const _case = await caseService.getOneCase(id);
            return res.json(_case);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CaseController()