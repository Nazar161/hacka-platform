const {User, UserInfo} = require('../models/models.js')
const ApiError = require("../exceptions/apiError.js");
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const MailService = require('./mailService.js');
const TokenService = require('./tokenService.js')
const UserDto = require("../dtos/userDto.js");
const {Team, Skill} = require("../models/models");


class UserService {
    async registration(name, surname, email, password, phone) {
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4();

        const user = await User.create({name, surname, email, password: hashPassword, phone, activation_link: activationLink});
        const userInfo = await UserInfo.create({user_id: user.id});
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
    async activate(activationLink) {
        const user = await User.findOne({where: {activation_link: activationLink}});
        if (!user) {
            throw ApiError.BadRequest(`неккоректная ссылка активации`);
        }
        user.is_activated = true;
        await user.save();
    }
    async login(email, password) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с таким email не найден`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenData = await TokenService.findToken(refreshToken);

        if(!userData || !tokenData) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findOne({where: {id: userData.id}});
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await User.findAll({
            where: {role_id: 1},
            attributes: ['id', 'name', 'surname', 'team_id']
        })
        return users;
    }

    async getOneUser(id) {
        const user = await User.findOne({
            where: {id},
            attributes: ['id', 'name', 'surname', 'team_id'],
            include: [
                {model: UserInfo, attributes: {exclude: ['createdAt', 'updatedAt']},
                    include: {model: Skill, attributes: ['id', 'name'], through: {attributes: []}}},
                {model: Team, attributes: ['id', 'name']}
            ]
        })
        return user;
    }

}

module.exports = new UserService()