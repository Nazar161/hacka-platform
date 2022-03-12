const {HackathonEvent, Partner, Organizer} = require("../models/models");

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
}

module.exports = new EventService()