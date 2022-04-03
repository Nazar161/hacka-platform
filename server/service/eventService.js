const {HackathonEvent, Partner, Organizer, Format, HackathonEventTeams, Team, HackathonEventInfo, Case} = require("../models/models");
const ApiError = require("../exceptions/apiError.js");

class EventService {
    async createEvent(title, start, end, prizeFund, location, formatId) {
        const event = await HackathonEvent.create({
            title,
            start,
            end,
            prize_fund: prizeFund,
            registration_is_closed: false,
            location,
            format_id: formatId
        })

        return event;
    }

    async addPartners(newPartners, existingPartnersId, eventId) {
        const partners = await Partner.bulkCreate(newPartners);

        const newPartnersId = partners.map(partner => partner.id);
        const allPartnersId = [...newPartnersId, ...existingPartnersId];

        const event = await HackathonEvent.findOne({where: {id: eventId}})
        await event.setPartners(allPartnersId); 
        return event;
    }

    async addOrganizers(newOrganizers, existingOrganizersId, eventId) {
        const organizers = await Organizer.bulkCreate(newOrganizers);
        const newOrganizersId = organizers.map(organizer => organizer.id);
        const allOrganizersId = [...newOrganizersId, ...existingOrganizersId];

        const event = await HackathonEvent.findOne({where: {id: eventId}});
        await event.setOrganizers(allOrganizersId);
        return event;
    }

    // universal searching method for Organizators and partners
    async searchSponsor(searchQuery, Sponsor) {
        const sponsors = await Sponsor.findAll({attributes: ['id', 'name', 'link']});
        const searchedSponsors = sponsors.filter(sponsor => sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()))
        return searchedSponsors;
    }

    async getAllEvents() {
        const events = await HackathonEvent.findAll({attributes: ['id', 'title', 'start', 'prize_fund', 'past_event', 'past_event']});
        return events;
    }

    async getOneEvent(id) {
        const event = await HackathonEvent.findOne({
            where: {id},
            attributes: {exclude: ['createdAt', 'updatedAt', 'format_id']},
            include: [
                {model: Format, attributes: ['value']},
                {model: HackathonEventInfo, attributes: ['overview', 'info', 'email', 'phone']}
            ]
        })

        if(!event) {
            throw ApiError.BadRequest(`Мероприятие с таким ID не существеут`);
        }

        return event;
    }

    async eventTeams(eventId) {
        const teams = await HackathonEventTeams.findAll({
            where: {
                hackathon_event_id: eventId,
                team_confirmation: true
            },
            attributes: [],
            include: {model: Team, attributes: ['id', 'name']}
        })
        
        const teamsArr = teams.map(team => team.team);

        return teamsArr;
    }

    async getTeamSelectedCaseId(eventId, team_id) {
        const caseId = await Case.findOne({
            attributes: ['id'],
            include: [
                {model: Team, where: {id: team_id}, attributes: []},
                {model: HackathonEvent, where: {id: eventId}, attributes: []}
            ]
        })

        return caseId;
    }
}

module.exports = new EventService()