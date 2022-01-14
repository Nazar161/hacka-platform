const UserService = require('../service/userService.js');
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/apiError.js");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            const {name, surname, email, password, phone} = req.body;
            const user = await UserService.registration(name, surname, email, password, phone);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user);
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await UserService.login(email, password);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user);
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const user = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(user);

        } catch (e) {
            next(e)
        }
    }
    async getAll(req, res) {
        const users = await UserService.getAllUsers();
        return res.json(users);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const user = await UserService.getOneUser(id);
        return res.json(user);
    }

    async getCaptains(req, res) {
        const captains = await UserService.getAllCaptains();
        return res.json(captains)
    }

    async create(req, res, next) {

    }
}

module.exports = new UserController();