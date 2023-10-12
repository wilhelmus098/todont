const userService  = require('../service/user');
const logger = require('../logger/api.logger');

class UserController {

    async getUsers() {
        logger.info('Controller: getUsers')
        return await userService.getUsers();
    }

    async createUser(user) {
        return await userService.createUser(user)
    }
}
module.exports = new UserController();