const ApiError = require("../exceptions/apiError.js");
const tokenService = require("../service/tokenService.js");

module.exports = function(role_id) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            if(!accessToken) {
                return next(ApiError.UnauthorizedError())
            }

            const userData = tokenService.validateAccessToken(accessToken);
            if(userData.role_id !== role_id) {
                return next(ApiError.Forbidden())
            }
            req.user = userData
            next()

        } catch (e) {
            return next(ApiError.UnauthorizedError())
        }
    }
}