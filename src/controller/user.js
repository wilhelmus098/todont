const userService  = require('../service/user');
const logger = require('../logger/api.logger');

class UserController {

    async getUsers() {
        logger.info('Controller: getUsers')
        return await userService.getUsers();
    }

    async createUser(user) {
        // logger.info('Controller: createTask', user)
        // return await taskService.createTask(task)
        return await userService.createUser(user)
    }

    // async updateTask(task) {
    //     logger.info('Controller: updateTask', task);
    //     return await taskService.updateTask(task);
    // }

    // async deleteTask(taskId) {
    //     logger.info('Controller: deleteTask', taskId);
    //     return await taskService.deleteTask(taskId);
    // }
}
module.exports = new UserController();