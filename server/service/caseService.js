const {TeamCurrentCase, Team, Case, HackathonEvent, Subject, Organizer} = require("../models/models");
const ApiError = require("../exceptions/apiError.js");
const moment = require('moment');

class CaseService {

    async createCase(title, description, details, hackathonEventId, organizerId, subjects) {
        const possibleCase = await Case.findOne({where: {title}});

        if (possibleCase) {
            throw ApiError.BadRequest(`Кейс с названием ${title} уже существеут`)
        }
        const _case = await Case.create({
            title,
            description,
            details,
            hackathon_event_id: hackathonEventId,
            organizer_id: organizerId
        })

        await _case.setSubjects(subjects);

        return _case;
        // I can add dto for cases and return normal case data!
    }

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

    async createSubject(title) {
        const possibleSubject = await Subject.findOne({where: {title}});

        if(possibleSubject) {
            throw ApiError.BadRequest(`Такакя тематика уже есть`);
        }

        const subject = await Subject.create({title});

        return subject
    }

// Cases open after event start-2hours, I must to fix it here 
    async getEventCases(eventId) {

        const event = await HackathonEvent.findOne({
            where: {id: eventId},
            attributes: ['start']
        })

        const currentDate = moment().format('YYYY-MM-DD HH:mm');

        const caseOpeningDate = moment(event.start).subtract(2, 'hours').format('YYYY-MM-DD HH:mm');

        if(moment(currentDate).isBefore(caseOpeningDate)) {
            throw ApiError.BadRequest(`Кейсы откроются в ${moment(caseOpeningDate).format('HH:mm')}`)
        }

        
        
        const cases = await Case.findAll({
            where: {hackathon_event_id: eventId},
            attributes: ['id', 'title', 'description',],
            include: {model: Organizer, attributes: ['id', 'name']}
        });
    
        return cases;
    }

    // Cases open after event start-2hours, I must to fix it here  
    async getOneCase(id) {
        const _case = await Case.findOne({where: {id}});

        if(!_case) {
            throw ApiError.BadRequest(`Кейс с таким id не существует`);
        }

        return _case;
    }
}

module.exports = new CaseService();