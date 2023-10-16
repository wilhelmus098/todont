const userService  = require('../service/user')
const logger = require('../logger/api.logger')

class UserController {
    async getUsers() {
        logger.info('Controller: getUsers')
        return await userService.getUsers()
    }

    async createUser(user) {
        return await userService.createUser(user)
    }

    async login(username) {
        return await userService.login(username)
    }

    async updatePassword(user) {
        return await userService.updatePassword(user)
    }
}
module.exports = new UserController()