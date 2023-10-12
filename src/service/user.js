const userRepository  = require('../repository/user');

class UserService {

    constructor() {}

    async getUsers() {
        return await userRepository.getUsers();
    }

    async createUser(user) {
        return await userRepository.createUser(user)
    }
    // async createTask(task) {
    //     return await taskRepository.createTask(task);
    // }

    // async updateTask(task) {
    //     return await taskRepository.updateTask(task);
    // }

    // async deleteTask(taskId) {
    //     return await taskRepository.deleteTask(taskId);
    // }
}

module.exports = new UserService();