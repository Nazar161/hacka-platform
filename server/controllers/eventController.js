const { Partner, Organizer } = require('../models/models.js');
const eventService = require('../service/eventService.js');

class EventController {
    async create(req, res) {
        const {title, start, end, prizeFund, location, formatId} = req.body;
        const event = await eventService.createEvent(title, start, end, prizeFund, location, formatId);
        return res.json(event)
    }
    
    async addPartners(req, res) {
        const {newPartners, existingPartnersId, eventId} = req.body;
        const eventPartners = await eventService.addPartners(newPartners, existingPartnersId, eventId);
        return res.json(eventPartners);
    }

// searching with debounce

    async addOrganizers(req, res) {
        const {newOrganizers, existingOrganizersId, eventId} = req.body;
        const eventOrganizers = await eventService.addOrganizers(newOrganizers, existingOrganizersId, eventId);
        return res.json(eventOrganizers);
    }

    async searchOrganizers(req, res) {
        const {searchQuery} = req.query;
        const organizerModel = Organizer
        const searchedOrganizers = await eventService.searchSponsor(searchQuery, organizerModel);
        return res.json(searchedOrganizers);
    }

    async searchPartners(req, res) {
        const {searchQuery} = req.query;
        const partnerModel = Partner;
        const searchedPartners = await eventService.searchSponsor(searchQuery, partnerModel);
        return res.json(searchedPartners);
    }

}

module.exports = new EventController();